import { initGallery } from './gallery.js';
import { initGalleryViewer } from './gallery-viewer.js';
import { initPhotoEditing } from './photo-editing.js';

const initApp = () => {
  initGallery();
  initGalleryViewer();
  initPhotoEditing();
};

document.addEventListener('DOMContentLoaded', initApp);
