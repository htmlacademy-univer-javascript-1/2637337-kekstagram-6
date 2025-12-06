import {
  bigPicture,
  bigPictureClose,
  bigPictureImg,
  bigPictureDescription,
  bigPictureLikes,
  bigPictureCommentsCount,
  bigPictureCommentsList,
  bigPictureOpenContainer,
  bigPictureCommentCount,
  bigPictureCommentLoader,
  body
} from './constants.js';

import { isEscapeKey } from './util.js';
import { postsArray } from './gallery.js';

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.src = comment.avatar;
  avatarImg.alt = comment.name;
  avatarImg.width = 35;
  avatarImg.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(avatarImg);
  commentElement.appendChild(textElement);

  return commentElement;
};

const renderAllComments = (comments) => {
  bigPictureCommentsList.innerHTML = '';
  comments.forEach((comment) => {
    bigPictureCommentsList.appendChild(createCommentElement(comment));
  });
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bigPictureCommentCount.classList.remove('hidden');
  bigPictureCommentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  bigPictureCommentCount.classList.add('hidden');
  bigPictureCommentLoader.classList.add('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    const currentThumbnails = Array.from(document.querySelectorAll('.picture'));
    const thumbnailImg = thumbnail.querySelector('.picture__img');
    const thumbnailLikes = thumbnail.querySelector('.picture__likes').textContent;
    const thumbnailComments = thumbnail.querySelector('.picture__comments').textContent;

    bigPictureImg.src = thumbnailImg.src;
    bigPictureDescription.textContent = thumbnailImg.alt;
    bigPictureLikes.textContent = thumbnailLikes;
    bigPictureCommentsCount.textContent = thumbnailComments;

    const index = currentThumbnails.indexOf(thumbnail);
    if (index !== -1) {
      renderAllComments(postsArray[index].comments);
    }

    openBigPicture();
  }
};

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});

bigPictureOpenContainer.addEventListener('click', (evt) => {
  onThumbnailClick(evt);
});

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}
