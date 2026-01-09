import { debounce } from './util.js';
import { renderPictures } from './gallery.js';
import { getRandomInteger } from './util.js';

const RANDOM_COUNT = 10;
const DELAY = 500;

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterContainer = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');

let currentFilter = FilterType.DEFAULT;
let pictures = [];

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getRandomPictures = () => {
  const copy = [...pictures];
  const count = Math.min(RANDOM_COUNT, copy.length);

  const result = Array.from({ length: count }, () => {
    const randomIndex = getRandomInteger(0, copy.length - 1);
    const randomItem = copy[randomIndex];
    copy.splice(randomIndex, 1);
    return randomItem;
  });

  return result;
};

const getFilteredPictures = () => {
  switch (currentFilter) {
    case FilterType.RANDOM:
      return getRandomPictures();
    case FilterType.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const renderFilteredPictures = debounce(() => {
  const filteredPictures = getFilteredPictures();
  renderPictures(filteredPictures);
}, DELAY);

const onFilterChange = (evt) => {
  const filterButton = evt.target.closest('.img-filters__button');

  if (!filterButton || filterButton.id === currentFilter) {
    return;
  }

  const activeButton = filterForm.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }

  filterButton.classList.add('img-filters__button--active');
  currentFilter = filterButton.id;
  renderFilteredPictures();
};

const initFilters = (loadedPictures) => {
  pictures = loadedPictures;
  filterContainer.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', onFilterChange);
};

const resetFilters = () => {
  filterForm.removeEventListener('click', onFilterChange);
  currentFilter = FilterType.DEFAULT;
  pictures = [];

  const activeButton = filterForm.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }

  const defaultButton = filterForm.querySelector(`#${FilterType.DEFAULT}`);
  if (defaultButton) {
    defaultButton.classList.add('img-filters__button--active');
  }
};

export { initFilters, resetFilters };
