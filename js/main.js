//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

// Случайное число из диапазона (включительно)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Случайный элемент массива
function getRandomArrayElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

// Перемешивание массива (алгоритм Фишера-Йетса)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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

function createComment() {
  const messageCount = getRandomInt(1, 2);
  const message = Array.from({ length: messageCount }, () => getRandomArrayElement(MESSAGES)).join(' ');

  return {
    id: commentId++,
    avatar: img/avatar-${getRandomInt(1, 6)}.svg,
    message: message,
    name: getRandomArrayElement(NAMES)
  };
}

//ГЕНЕРАЦИЯ ФОТОГРАФИЙ

function createPhoto(id) {
  const commentsCount = getRandomInt(0, 30);
  const comments = Array.from({ length: commentsCount }, createComment);

  return {
    id: id,
    url: photos/${id}.jpg,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(15, 200),
    comments: comments
  };
}

function generatePhotos() {
  return Array.from({ length: 25 }, (_, i) => createPhoto(i + 1));
}

// ВЫЗОВ

const photos = generatePhotos();
console.log(photos);
