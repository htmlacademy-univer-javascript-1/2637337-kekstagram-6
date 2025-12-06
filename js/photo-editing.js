import { isEscapeKey } from './util.js';
import { resetFormValidation, initFormValidation } from './validation.js';

const photoUploading = document.querySelector('.img-upload__input');
const photoEditor = document.querySelector('.img-upload__overlay');
const mainWindow = document.body;
const closeEditor = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
document.activeElement === commentField;

const closePhotoEditor = () => {
  form.reset();
  photoUploading.value = '';
  mainWindow.classList.remove('modal-open');
  photoEditor.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetFormValidation();
};

const openPhotoEditor = () => {
  photoEditor.classList.remove('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initFormValidation();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

photoUploading.addEventListener('change', openPhotoEditor);
closeEditor.addEventListener('click', closePhotoEditor);
