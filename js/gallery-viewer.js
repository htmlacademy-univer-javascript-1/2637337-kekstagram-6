import { isEscapeKey } from './util.js';
import { postsArray } from './gallery.js';
import { initComments, onCommentsLoaderClick, resetComments } from './gallery-comments.js';
import { initLikes, onLikesClick, resetLikes } from './gallery-likes.js';

const openPostViewer = document.querySelector('.pictures');
const closePostViewer = document.querySelector('.big-picture__cancel');
const mainwindow = document.body;

const postViewer = document.querySelector('.big-picture');
const postViewerImg = postViewer.querySelector('.big-picture__img img');
const postViewerDescription = postViewer.querySelector('.social__caption');
const postViewerComments = postViewer.querySelector('.comments-count');
const postViewerCommentLoader = document.querySelector('.comments-loader');
const postViewerLikes = postViewer.querySelector('.likes-count');

const onClosePostViewer = () => {
  postViewer.classList.add('hidden');
  mainwindow.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  resetComments();
  resetLikes();
};

const onOpenPostViewer = () => {
  postViewer.classList.remove('hidden');
  mainwindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  postViewerCommentLoader.addEventListener('click', onCommentsLoaderClick);
  postViewerLikes.addEventListener('click', onLikesClick);
};

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    const currentThumbnails = Array.from(document.querySelectorAll('.picture'));
    const thumbnailImg = thumbnail.querySelector('.picture__img');
    const index = currentThumbnails.indexOf(thumbnail);

    if (index !== -1) {
      const postData = postsArray[index];

      postViewerImg.src = thumbnailImg.src;
      postViewerDescription.textContent = thumbnailImg.alt;
      postViewerComments.textContent = postData.comments.length;

      initLikes(index, postData.likes);
      initComments(postData.comments);

      onOpenPostViewer();
    }
  }
};

closePostViewer.addEventListener('click', () => {
  onClosePostViewer();
});

openPostViewer.addEventListener('click', (evt) => {
  onThumbnailClick(evt);
});

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClosePostViewer();
  }
}
