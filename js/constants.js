export const USER_NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Екатерина',
  'Сергей',
  'Ольга',
  'Дмитрий',
  'Анна',
  'Никита',
  'Ксения'
];

export const COMMENT_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота.',
  'Лица у людей на фотке перекошены — неудачный момент!'
];

export const PHOTO_CAPTIONS = [
  'Прекрасный момент, запечатлённый на камеру',
  'Люблю этот вид',
  'Как я тут оказался?',
  'Ну что за красота!',
  '2 из 10',
  'Полный стрём!'
];

export const AVATAR_TOTAL = 6;
export const TOTAL_PHOTOS = 25;
export const MAX_COMMENTS = 30;
export const MIN_LIKES = 15;
export const MAX_LIKES = 200;
export const USED_PHOTO_IDS = [];

export const bigPicture = document.querySelector('.big-picture');
export const bigPictureClose = document.querySelector('.big-picture__cancel');
export const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
export const bigPictureDescription = bigPicture.querySelector('.social__caption');
export const bigPictureLikes = bigPicture.querySelector('.likes-count');
export const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
export const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
export const bigPictureOpenContainer = document.querySelector('.pictures');
export const bigPictureCommentCount = document.querySelector('.social__comment-count');
export const bigPictureCommentLoader = document.querySelector('.comments-loader');
export const body = document.body;
