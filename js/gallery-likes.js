import { getPostsArray } from './gallery.js';

let isLiked = false;
let currentPostIndex = -1;

const onToggleLike = () => {
  if (currentPostIndex !== -1) {
    const postsArray = getPostsArray();
    const postViewerLikes = document.querySelector('.likes-count');

    if (!postViewerLikes) {
      return;
    }

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
      const thumbnailLikes = thumbnail.querySelector('.picture__likes');
      if (thumbnailLikes) {
        thumbnailLikes.textContent = postsArray[currentPostIndex].likes;
      }
    }
  }
};

const onLikesClick = (evt) => {
  evt.preventDefault();
  onToggleLike();
};

const initLikes = (pictureIndex, likesCount) => {
  const postViewerLikes = document.querySelector('.likes-count');

  if (!postViewerLikes) {
    return;
  }

  currentPostIndex = pictureIndex;
  isLiked = false;
  postViewerLikes.textContent = likesCount;

  postViewerLikes.removeEventListener('click', onLikesClick);
  postViewerLikes.addEventListener('click', onLikesClick);
};

const resetLikes = () => {
  isLiked = false;
  currentPostIndex = -1;
};

export { initLikes, resetLikes };
