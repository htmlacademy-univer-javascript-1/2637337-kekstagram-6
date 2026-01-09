import { renderPictures } from './gallery.js';
import { initFilters } from './filters.js';
import './gallery-viewer.js';
import './photo-editing.js';
import './photo-scale.js';
import { getData } from './api.js';
import { showErrorMessage } from './validation.js';

getData()
  .then((data) => {
    renderPictures(data);
    initFilters(data);
  })
  .catch((error) => {
    showErrorMessage(error.message);
  });
