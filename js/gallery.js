import { getData } from './api.js';
import { showErrorMessage } from './messages.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

let posts = [];

const renderGallery = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const picture = template.cloneNode(true);

    picture.querySelector('.picture__img').src = item.url;
    picture.querySelector('.picture__img').alt = item.description;
    picture.querySelector('.picture__likes').textContent = item.likes;
    picture.querySelector('.picture__comments').textContent = item.comments.length;

    picture.dataset.id = item.id;

    fragment.append(picture);
  });

  container.append(fragment);
  posts = data;
};

const initGallery = async () => {
  try {
    const data = await getData();
    renderGallery(data);
  } catch(error) {
    showErrorMessage();
  }
};

const getPostsArray = () => posts;

export { initGallery, getPostsArray };
