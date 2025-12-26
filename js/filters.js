// filters.js
import { getPostsArray, renderGallery, getAllPosts } from './gallery.js';

// Функция debounce для устранения дребезга
function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// Элементы фильтров
const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

// Очистка галереи (только фотографии, значок Кексограмм не трогаем)
const clearGallery = () => {
  const galleryContainer = document.querySelector('.pictures');
  const pictures = galleryContainer.querySelectorAll('.picture');
  pictures.forEach((el) => el.remove());
};

// Получение 10 случайных постов без повторений
const getRandomPosts = (posts, count) => {
  const postsCopy = [...posts];
  const result = [];
  while (result.length < count && postsCopy.length > 0) {
    const index = Math.floor(Math.random() * postsCopy.length);
    result.push(postsCopy.splice(index, 1)[0]);
  }
  return result;
};

// Применение фильтра
const applyFilter = (filterType) => {
  let filteredPosts;

  switch (filterType) {
    case 'random':
      filteredPosts = getRandomPosts(getPostsArray(), 10);
      break;
    case 'discussed':
      filteredPosts = [...getPostsArray()].sort((a, b) => b.comments.length - a.comments.length).slice(0, 10);
      break;
    case 'default':
    default:
      filteredPosts = getAllPosts(); // возвращаем все 25
  }

  clearGallery();
  renderGallery(filteredPosts);
};

// Обработчик клика с debounce
const onFilterClick = debounce((evt) => {
  const button = evt.target.closest('.img-filters__button');
  if (!button) {return;}

  // Сбрасываем активный класс
  filtersForm.querySelectorAll('.img-filters__button').forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  button.classList.add('img-filters__button--active');

  // Определяем фильтр по id кнопки
  switch (button.id) {
    case 'filter-default':
      applyFilter('default');
      break;
    case 'filter-random':
      applyFilter('random');
      break;
    case 'filter-discussed':
      applyFilter('discussed');
      break;
  }
}, 500);

// Инициализация фильтров
const initFilters = () => {
  if (!filtersContainer || !filtersForm) {return;}

  filtersContainer.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFilterClick);
};

export { initFilters };
