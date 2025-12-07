import { isEscapeKey } from './util.js';
import { resetFormValidation, initFormValidation } from './validation.js';
import { initEffects, resetEffects } from './photo-effects.js';
import { initScale, resetScale } from './photo-scale.js';

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
  // 1. Сбрасываем компоненты (удаляем обработчики + сбрасываем значения)
  resetEffects();
  resetScale();
  // 2. Очищаем форму
  form.reset();
  photoUploading.value = '';
  // 3. Скрываем редактор
  photoEditor.classList.add('hidden');
  mainWindow.classList.remove('modal-open');
  // 4. Убираем глобальные обработчики
  document.removeEventListener('keydown', onDocumentKeydown);
  resetFormValidation();
};

const openPhotoEditor = () => {
  // 1. Показываем редактор
  photoEditor.classList.remove('hidden');
  mainWindow.classList.add('modal-open');
  // 2. Добавляем глобальные обработчики
  document.addEventListener('keydown', onDocumentKeydown);
  // 3. Инициализируем компоненты
  initFormValidation();
  initScale();
  initEffects();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

photoUploading.addEventListener('change', openPhotoEditor);
closeEditor.addEventListener('click', closePhotoEditor);
