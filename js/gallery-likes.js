import { getPictures } from './gallery.js';

let currentPictureIndex = -1;

const bigPicLikes = document.querySelector('.likes-count');

const onToggleLike = () => {
  if (currentPictureIndex !== -1) {
    const pictures = getPictures();
    const picture = pictures[currentPictureIndex];

    if (!picture) {
      return;
    }

    if (picture.userLiked) {
      picture.likes--;
      picture.userLiked = false;
    } else {
      picture.likes++;
      picture.userLiked = true;
    }

    bigPicLikes.textContent = picture.likes;

    const thumbnail = document.querySelector(`.picture[data-index="${currentPictureIndex}"]`);
    if (thumbnail) {
      thumbnail.querySelector('.picture__likes').textContent = picture.likes;
    }
  }
};

const onLikesClick = () => {
  onToggleLike();
};

const initLikes = (pictureIndex, likesCount) => {
  currentPictureIndex = pictureIndex;
  bigPicLikes.textContent = likesCount;
  bigPicLikes.addEventListener('click', onLikesClick);
};

const resetLikes = () => {
  currentPictureIndex = -1;
  bigPicLikes.removeEventListener('click', onLikesClick);
};

export { initLikes, onLikesClick, resetLikes };
