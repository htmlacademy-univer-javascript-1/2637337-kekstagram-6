import { getPostsArray, renderGallery, getAllPosts } from './gallery.js';


function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');


const clearGallery = () => {
  const galleryContainer = document.querySelector('.pictures');
  const pictures = galleryContainer.querySelectorAll('.picture');
  pictures.forEach((el) => el.remove());
};


const getRandomPosts = (posts, count) => {
  const postsCopy = [...posts];
  const result = [];
  while (result.length < count && postsCopy.length > 0) {
    const index = Math.floor(Math.random() * postsCopy.length);
    result.push(postsCopy.splice(index, 1)[0]);
  }
  return result;
};


const applyFilter = (filterType) => {
  let filteredPosts;

  switch (filterType) {
    case 'random':
      filteredPosts = getRandomPosts(getPostsArray(), 10);
      break;
    case 'discussed':
      filteredPosts = [...getPostsArray()].sort((a, b) => b.comments.length - a.comments.length).slice(0, 25);
      break;
    case 'default':
    default:
      filteredPosts = getAllPosts();
  }

  clearGallery();
  renderGallery(filteredPosts);
};


const onFilterClick = debounce((evt) => {
  const button = evt.target.closest('.img-filters__button');
  if (!button) {return;}


  filtersForm.querySelectorAll('.img-filters__button').forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  button.classList.add('img-filters__button--active');


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


const initFilters = () => {
  if (!filtersContainer || !filtersForm) {return;}

  filtersContainer.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFilterClick);
};

export { initFilters };
