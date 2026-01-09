import { isEscapeKey } from './util.js';
import { getPictures } from './gallery.js';
import { initComments, onCommentsLoaderClick, resetComments } from './gallery-comments.js';
import { initLikes, onLikesClick, resetLikes } from './gallery-likes.js';

const openBigPic = document.querySelector('.pictures');
const closeBigPic = document.querySelector('.big-picture__cancel');
const mainWindow = document.body;

const bigPicture = document.querySelector('.big-picture');
const bigPicImg = bigPicture.querySelector('.big-picture__img img');
const bigPicDescription = bigPicture.querySelector('.social__caption');
const bigPicComments = bigPicture.querySelector('.comments-count');
const bigPicCommentLoader = document.querySelector('.comments-loader');
const bigPicLikes = document.querySelector('.likes-count');
const bigPicCommentInput = document.querySelector('.social__footer-text');

const onCloseBigPic = () => {
  bigPicture.classList.add('hidden');
  mainWindow.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  if (bigPicCommentInput) {
    bigPicCommentInput.value = '';
  }

  resetComments();
  resetLikes();
};

const onOpenBigPic = () => {
  bigPicture.classList.remove('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPicCommentLoader.addEventListener('click', onCommentsLoaderClick);
  bigPicLikes.addEventListener('click', onLikesClick);
};

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    const pictures = getPictures();
    const index = parseInt(thumbnail.dataset.index, 10);

    if (index !== -1) {
      const pictureData = pictures[index];

      bigPicImg.src = pictureData.url;
      bigPicDescription.textContent = pictureData.description;
      bigPicComments.textContent = pictureData.comments.length;

      initLikes(index, pictureData.likes);
      initComments(pictureData.comments);

      onOpenBigPic();
    }
  }
};

closeBigPic.addEventListener('click', () => {
  onCloseBigPic();
});

openBigPic.addEventListener('click', (evt) => {
  onThumbnailClick(evt);
});

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseBigPic();
  }
}
