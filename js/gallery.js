// gallery.js
import { getData } from './api.js';
import { initFilters } from './filters.js';

const templateNode = document.querySelector('#picture');
const galleryContainer = document.querySelector('.pictures');

let allPosts = [];
let currentPosts = [];

// Функция применения эффекта к изображению
const applyEffectToImage = (imgElement, effect, scale) => {
  if (!imgElement) {return;}

  // Применяем масштаб
  imgElement.style.transform = `scale(${scale || 1})`;

  // Применяем фильтр
  const effectsMap = {
    'chrome': 'grayscale(1)',
    'sepia': 'sepia(1)',
    'marvin': 'invert(100%)',
    'phobos': 'blur(3px)',
    'heat': 'brightness(3)',
    'none': 'none'
  };

  imgElement.style.filter = effectsMap[effect] || 'none';
};

const clearGallery = () => {
  const pictures = galleryContainer.querySelectorAll('.picture');
  pictures.forEach((el) => el.remove());
};

const renderGallery = (posts) => {
  if (!templateNode || !galleryContainer) {
    return;
  }

  clearGallery();

  const template = templateNode.content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const postNode = template.cloneNode(true);
    const imageNode = postNode.querySelector('.picture__img');

    // Устанавливаем источник изображения
    imageNode.src = post.url;
    imageNode.alt = post.description;

    // ВАЖНО: ПРИМЕНЯЕМ ЭФФЕКТЫ И МАСШТАБ К МИНИАТЮРЕ!
    applyEffectToImage(imageNode, post.effect, post.scale);

    const likesElement = postNode.querySelector('.picture__likes');
    if (likesElement) {
      likesElement.textContent = post.likes;
    }

    const commentsElement = postNode.querySelector('.picture__comments');
    if (commentsElement) {
      commentsElement.textContent = post.comments.length;
    }

    postNode.dataset.id = post.id;
    fragment.append(postNode);
  });

  galleryContainer.appendChild(fragment);
  currentPosts = posts;
};

const initGallery = async () => {
  try {
    const data = await getData();
    allPosts = data;
    // Добавляем поля по умолчанию для фото с сервера
    allPosts = allPosts.map((post) => ({
      ...post,
      effect: post.effect || 'none',    // если уже есть - используем, иначе 'none'
      scale: post.scale || 1            // если уже есть - используем, иначе 1
    }));
    renderGallery(allPosts);
    initFilters();
  } catch (_) {
    renderGallery([]);
  }
};

const getPostsArray = () => currentPosts;
const getAllPosts = () => allPosts;

export { initGallery, getPostsArray, renderGallery, getAllPosts };
