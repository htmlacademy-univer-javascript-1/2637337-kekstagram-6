import { generatePosts } from './data.js';

const templateNode = document.querySelector('#picture').content.querySelector('.picture');
export const postsArray = generatePosts();
const galleryContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

postsArray.forEach(({ url, description, likes, comments }) => {
  const postNode = templateNode.cloneNode(true);
  const imageNode = postNode.querySelector('.picture__img');
  imageNode.src = url;
  imageNode.alt = description;
  postNode.querySelector('.picture__likes').textContent = likes;
  postNode.querySelector('.picture__comments').textContent = comments.length;
  fragment.append(postNode);
});

galleryContainer.append(fragment);
