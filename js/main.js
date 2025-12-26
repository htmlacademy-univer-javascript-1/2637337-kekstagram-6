// main.js
import { initGallery } from './gallery.js';
import { initGalleryViewer } from './gallery-viewer.js';
import { initPhotoEditing } from './photo-editing.js';

const initApp = () => {
  initGallery();          // загружаем галерею с сервера
  initGalleryViewer();    // инициализация просмотра фотографий
  initPhotoEditing();     // инициализация редактирования/загрузки фото
};

document.addEventListener('DOMContentLoaded', initApp);
