import {
  USER_NAMES,
  COMMENT_TEXTS,
  PHOTO_CAPTIONS,
  AVATAR_TOTAL,
  TOTAL_PHOTOS,
  MAX_COMMENTS,
  MIN_LIKES,
  MAX_LIKES,
  USED_PHOTO_IDS
} from './constants.js';

import {
  getRandomInteger,
  getRandomArrayElement,
  getRandomNoRepeatInt,
  createIdGenerator
} from './util.js';

const getCommentId = createIdGenerator();

const createMessage = () =>
  Array.from(
    { length: getRandomInteger(1, 2) },
    () => getRandomArrayElement(COMMENT_TEXTS)
  ).join(' ');

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_TOTAL)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(USER_NAMES),
});

const createPost = () => {
  const postId = getRandomNoRepeatInt(1, TOTAL_PHOTOS, USED_PHOTO_IDS);

  return {
    id: postId,
    url: `photos/${postId}.jpg`,
    description: getRandomArrayElement(PHOTO_CAPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from(
      { length: getRandomInteger(0, MAX_COMMENTS) },
      createComment
    ),
  };
};

export const generatePosts = () => Array.from(
  { length: TOTAL_PHOTOS },
  createPost
);
