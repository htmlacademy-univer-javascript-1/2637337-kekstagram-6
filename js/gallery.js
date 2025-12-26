// gallery.js
import { getData } from './api.js';
import { initFilters } from './filters.js';

const templateNode = document.querySelector('#picture');
const galleryContainer = document.querySelector('.pictures');

let allPosts = [];   // сохраняем все 25 фотографий с сервера
let currentPosts = []; // текущий массив, который рендерим

// Очистка галереи (удаляем только фотографии)
const clearGallery = () => {
  const pictures = galleryContainer.querySelectorAll('.picture');
  pictures.forEach((el) => el.remove());
};

// Отрисовка галереи
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

    imageNode.src = post.url;
    imageNode.alt = post.description;

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

// Инициализация галереи с загрузкой данных
const initGallery = async () => {
  try {
    const data = await getData();
    allPosts = data;         // сохраняем исходные 25 фотографий
    renderGallery(allPosts); // по умолчанию рендерим все 25
    initFilters();           // показываем фильтры после загрузки
  } catch (_) {
    renderGallery([]);
  }
};

// Получение массива постов
const getPostsArray = () => currentPosts;
const getAllPosts = () => allPosts; // для фильтров по умолчанию

export { initGallery, getPostsArray, renderGallery, getAllPosts };
