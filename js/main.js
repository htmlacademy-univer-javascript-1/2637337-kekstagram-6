`use strict`;

//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

/**
 * Возвращает случайное целое число из диапазона [min, max]
 */
function getRandomInt(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/**
 * Возвращает случайный элемент массива
 */
function getRandomArrayElement(elements) {
  return elements[getRandomInt(0, elements.length - 1)];
}

//ДАННЫЕ ДЛЯ ГЕНЕРАЦИИ

const DESCRIPTIONS = [
  'Моё любимое место на свете 🌅',
  'Поймал идеальный кадр!',
  'Отдыхаю после трудного дня',
  'Путешествие мечты ✈️',
  'Это был потрясающий день 😍',
  'Просто наслаждаюсь моментом',
  'Кофе и тишина — лучшее утро ☕️',
  'Когда природа вдохновляет',
  'Тестирую новый фотоаппарат 📸',
  'Случайный кадр, но мне нравится!',
  'Настроение: лето и свобода 🌞',
  'Фото с друзьями — всегда лучшие воспоминания!',
  'Люблю этот город 💛',
  'Мои маленькие радости',
  'Лучше один раз увидеть 👀'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём', 'Мария', 'Иван', 'Екатерина', 'Сергей',
  'Ольга', 'Дмитрий', 'Анна', 'Никита', 'Ксения',
  'Михаил', 'Алина', 'Игорь', 'Полина', 'Владимир'
];

// ГЕНЕРАЦИЯ КОММЕНТАРИЕВ

let commentId = 1;

/**
 * Создаёт один комментарий
 */
function createComment() {
  const messageCount = getRandomInt(1, 2);
  let message = '';

  for (let i = 0; i < messageCount; i++) {
    message += `${getRandomArrayElement(MESSAGES)}` ;
  }

  return {
    id: commentId++,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: message.trim(),
    name: getRandomArrayElement(NAMES)
  };
}

/**
 * Создаёт массив комментариев
 */
function createComments(count) {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(createComment());
  }
  return comments;
}

//ГЕНЕРАЦИЯ ФОТОГРАФИЙ

/**
 * Создаёт объект фотографии
 */
function createPhoto(id) {
  const commentsCount = getRandomInt(0, 30);
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(15, 200),
    comments: createComments(commentsCount)
  };
}

/**
 * Генерирует массив из 25 фотографий
 */
function generatePhotos() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
}

//ВЫЗОВ

const photos = generatePhotos();
