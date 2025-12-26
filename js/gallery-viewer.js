import { isEscapeKey } from './util.js';
import { getPostsArray } from './gallery.js';
import { initComments, resetComments } from './gallery-comments.js';
import { initLikes, resetLikes } from './gallery-likes.js';

const openPostViewer = document.querySelector('.pictures');
const closePostViewer = document.querySelector('.big-picture__cancel');
const mainwindow = document.body;

const postViewer = document.querySelector('.big-picture');
const postViewerImg = postViewer.querySelector('.big-picture__img img');
const postViewerDescription = postViewer.querySelector('.social__caption');
const postViewerComments = postViewer.querySelector('.comments-count');

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
};

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    const postsArray = getPostsArray();
    const postId = thumbnail.dataset.id;

    const postData = postsArray.find((item) => String(item.id) === postId);

    if (postData) {
      postViewerImg.src = postData.url;
      postViewerImg.alt = postData.description;
      postViewerDescription.textContent = postData.description;
      postViewerComments.textContent = postData.comments.length;

      const currentThumbnails = Array.from(document.querySelectorAll('.picture'));
      const index = currentThumbnails.indexOf(thumbnail);

      initLikes(index, postData.likes);
      initComments(postData.comments);

      onOpenPostViewer();
    }
  }
};

const initGalleryViewer = () => {
  closePostViewer.addEventListener('click', onClosePostViewer);
  openPostViewer.addEventListener('click', onThumbnailClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClosePostViewer();
  }
}

export { initGalleryViewer };
