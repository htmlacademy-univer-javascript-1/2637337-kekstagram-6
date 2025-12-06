import { postsArray } from './gallery.js';

let isLiked = false;
let currentPostIndex = -1;

const postViewerLikes = document.querySelector('.likes-count');

const onToggleLike = () => {
  if (currentPostIndex !== -1) {
    if (isLiked) {
      postsArray[currentPostIndex].likes--;
      isLiked = false;
    } else {
      postsArray[currentPostIndex].likes++;
      isLiked = true;
    }

    const currentThumbnails = Array.from(document.querySelectorAll('.picture'));
    postViewerLikes.textContent = postsArray[currentPostIndex].likes;
    const thumbnail = currentThumbnails[currentPostIndex];
    if (thumbnail) {
      thumbnail.querySelector('.picture__likes').textContent = postsArray[currentPostIndex].likes;
    }
  }
};

const onLikesClick = () => {
  onToggleLike();
};

const initLikes = (pictureIndex, likesCount) => {
  currentPostIndex = pictureIndex;
  isLiked = false;
  postViewerLikes.textContent = likesCount;
};

const resetLikes = () => {
  isLiked = false;
  currentPostIndex = -1;
  postViewerLikes.removeEventListener('click', onLikesClick);
};

export { initLikes, onLikesClick, resetLikes };
