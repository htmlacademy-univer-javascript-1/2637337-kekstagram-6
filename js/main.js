const NAMES = [
  'Виктория',
  'Екатерина',
  'Евгения',
  'Кристина',
  'Василиса',
  'Георгий',
  'Сергей',
  'Иван',
  'Павел',
  'Роман'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Прекрасный момент, запечатлённый на камеру',
  'Люблю этот вид',
  'Как я тут оказался?',
  'Ну что за красота!',
  '2 из 10',
  'Полный стрём!'
];

const AVATAR_COUNT = 6;
const POSTS_COUNT = 25;
const COMMENT_COUNT = 30;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const USED_POST_ID = [];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

const getRandomNoRepeatInt = (min, max, usedArray) => {
  let currentValue;
  currentValue = getRandomInteger(min, max);
  while (usedArray.includes(currentValue))
  {
    currentValue = getRandomInteger(min, max);
  }
  usedArray.push(currentValue);
  return currentValue;
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getCommentId = createIdGenerator();

const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(MESSAGES),
).join(' ');

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, AVATAR_COUNT) }.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPost = () => {
  const postId = getRandomNoRepeatInt(1, POSTS_COUNT, USED_POST_ID);

  return {
    id: postId,
    url: `photos/${ postId }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
    comments: Array.from(
      { length: getRandomInteger(0, COMMENT_COUNT) },
      createComment,
    ),
  };
};

// eslint-disable-next-line no-unused-vars
const posts = Array.from(
  { length: POSTS_COUNT },
  createPost,
);
