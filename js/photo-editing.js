import { isEscapeKey } from './util.js';
import { resetFormValidation, initFormValidation } from './validation.js';
import { initEffects, resetEffects } from './photo-effects.js';
import { initScale, resetScale } from './photo-scale.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const photoInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const closeButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
const previewImage = document.querySelector('.img-upload__preview img');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

// 🔥 Добавляем выбор всех мини-превью
const effectsPreview = document.querySelectorAll('.effects__preview');

const isTextFieldFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;

const setSubmitButtonState = (disabled) => {
  submitButton.disabled = disabled;
  submitButton.textContent = disabled ? 'Отправка...' : 'Опубликовать';
};

// 🔥 Новая функция — обновляем мини-превью
const updateEffectsPreview = (fileUrl) => {
  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url('${fileUrl}')`;
  });
};

const closeEditor = () => {
  resetEffects();
  resetScale();
  resetFormValidation();

  form.reset();

  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);

  previewImage.src = 'img/upload-default-image.jpg';
  updateEffectsPreview('img/upload-default-image.jpg'); // 🔥 Вернули плейсхолдер
};

const openEditor = () => {
  const file = photoInput.files[0];
  if (file) {
    const fileUrl = URL.createObjectURL(file);
    previewImage.src = fileUrl;

    updateEffectsPreview(fileUrl); // 🔥 Мини-превью → такая же картинка
  }

  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  initFormValidation();
  initScale();
  initEffects();

  document.addEventListener('keydown', onEscKeydown);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!window.pristine.validate()) {
    return;
  }

  setSubmitButtonState(true);

  try {
    const formData = new FormData(form);
    await sendData(formData);
    closeEditor();
    showSuccessMessage();
  } catch(error) {
    showErrorMessage();
    setSubmitButtonState(false);
  }
};

function onEscKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeEditor();
  }
}

const initPhotoEditing = () => {
  photoInput.addEventListener('change', openEditor);
  closeButton.addEventListener('click', closeEditor);
  form.addEventListener('submit', onFormSubmit);
};

export { initPhotoEditing };
