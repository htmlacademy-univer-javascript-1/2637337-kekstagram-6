import { isEscapeKey } from './util.js';
import { resetFormValidation, initFormValidation, unblockSubmitButton } from './validation.js';
import { initEffects, resetEffects } from './photo-effects.js';
import { initScale, resetScale, cleanupScale } from './photo-scale.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageUploading = document.querySelector('.img-upload__input');
const imageEditor = document.querySelector('.img-upload__overlay');
const mainWindow = document.body;
const closeEditor = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const defaultImageSrc = 'img/upload-default-image.jpg';

let currentImageUrl = null;

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const updateAllPreviews = (imageUrl) => {
  previewImage.src = imageUrl;

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url("${imageUrl}")`;
  });
};

const cleanupImageEditor = () => {
  form.reset();
  imageUploading.value = '';

  if (currentImageUrl) {
    URL.revokeObjectURL(currentImageUrl);
    currentImageUrl = null;
  }

  updateAllPreviews(defaultImageSrc);

  resetFormValidation();
  resetEffects();
  cleanupScale();
  resetScale();

  const submitButton = form.querySelector('.img-upload__submit');
  if (submitButton) {
    submitButton.disabled = false;
  }
};

const closeImageEditor = () => {
  cleanupImageEditor();
  unblockSubmitButton();
  mainWindow.classList.remove('modal-open');
  imageEditor.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showFileTypeError = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const body = document.querySelector('body');

  const errorElement = errorTemplate.cloneNode(true);

  const titleElement = errorElement.querySelector('h2');
  if (titleElement) {
    titleElement.textContent = 'Неверный тип файла.\nВыберите изображение в формате GIF, JPEG или PNG';
    titleElement.style.whiteSpace = 'pre-line';
  }

  const closeModal = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEscapeKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscapeKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }

  function onOutsideClick (evt) {
    if (!evt.target.closest('.error__inner')) {
      closeModal();
    }
  }

  const closeButton = errorElement.querySelector('.error__button');
  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('click', onOutsideClick);

  body.appendChild(errorElement);
  imageUploading.value = '';
};

const openImageEditor = () => {
  const file = imageUploading.files[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const isImageFile = FILE_TYPES.some((type) => fileName.endsWith(type));
  const isImageType = file.type.startsWith('image/');

  if (!isImageFile || !isImageType) {
    showFileTypeError();
    return;
  }

  if (currentImageUrl) {
    URL.revokeObjectURL(currentImageUrl);
  }

  currentImageUrl = URL.createObjectURL(file);
  updateAllPreviews(currentImageUrl);

  imageEditor.classList.remove('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  initFormValidation();
  initEffects();
  initScale();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    const submitButton = form.querySelector('.img-upload__submit');
    if (submitButton.disabled) {
      unblockSubmitButton();
    }

    closeImageEditor();
  }
}

imageUploading.addEventListener('change', openImageEditor);
closeEditor.addEventListener('click', closeImageEditor);

export { closeImageEditor, openImageEditor };

