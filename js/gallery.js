import { getData } from './api.js';
import { initFilters } from './filters.js';

const templateNode = document.querySelector('#picture');
const galleryContainer = document.querySelector('.pictures');

let allPosts = [];
let currentPosts = [];


const applyEffectToImage = (imgElement, effect, scale) => {
  if (!imgElement) {return;}

  imgElement.style.transform = `scale(${scale || 1})`;

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

const showLoadErrorMessage = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = '0';
  alertContainer.style.left = '0';
  alertContainer.style.width = '100%';
  alertContainer.style.padding = '10px 20px';
  alertContainer.style.backgroundColor = '#ff4d4d';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.zIndex = '1000';
  alertContainer.textContent = 'Не удалось загрузить фотографии. Пожалуйста, попробуйте позже.';

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
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

    imageNode.src = post.url;
    imageNode.alt = post.description;

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

    allPosts = allPosts.map((post) => ({
      ...post,
      effect: post.effect || 'none',
      scale: post.scale || 1
    }));
    renderGallery(allPosts);
    initFilters();
  } catch (_) {
    showLoadErrorMessage();
    renderGallery([]);
  }
};

const getPostsArray = () => currentPosts;
const getAllPosts = () => allPosts;

export { initGallery, getPostsArray, renderGallery, getAllPosts };
