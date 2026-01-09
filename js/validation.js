import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { closeImageEditor } from './photo-editing.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_PATTERN: 'Хэштег должен начинаться с # и содержать не более 20 символов',
  INVALID_COUNT: `Не более ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  INVALID_COMMENT: `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`
};

const ValidatorPriority = {
  PATTERN: 1,
  INVALID_COUNT: 2,
  UNIQUENESS: 3,
  COMMENT: 1
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const normalizeHashtags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidHashtags = (value) =>
  normalizeHashtags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) =>
  normalizeHashtags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueHashtags = (value) => {
  const lowerCaseTags = normalizeHashtags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const hasValidComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagInput,
  hasValidHashtags,
  ErrorText.INVALID_PATTERN,
  ValidatorPriority.PATTERN,
  true
);

pristine.addValidator(
  hashtagInput,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  ValidatorPriority.COUNT,
  true
);

pristine.addValidator(
  hashtagInput,
  hasUniqueHashtags,
  ErrorText.NOT_UNIQUE,
  ValidatorPriority.UNIQUENESS,
  true
);

pristine.addValidator(
  commentInput,
  hasValidComment,
  ErrorText.INVALID_COMMENT,
  ValidatorPriority.COMMENT,
  true
);

const showMessage = (template, closeButtonSelector, innerSelector, message = null) => {
  const element = template.cloneNode(true);

  if (message) {
    const titleElement = element.querySelector('h2');
    if (titleElement) {
      titleElement.textContent = message;
    }
  }

  const closeModal = () => {
    element.remove();
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
    if (!evt.target.closest(innerSelector)) {
      closeModal();
    }
  }

  const closeButton = element.querySelector(closeButtonSelector);
  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('click', onOutsideClick);

  body.appendChild(element);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const showSuccessMessage = () => {
  unblockSubmitButton();
  closeImageEditor();
  showMessage(successTemplate, '.success__button', '.success__inner');
};

const showErrorMessage = (message) => {
  showMessage(errorTemplate, '.error__button', '.error__inner', message);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();

    const formData = new FormData(form);

    sendData(formData)
      .then(() => {
        closeImageEditor();
        showSuccessMessage();
      })
      .catch((error) => {
        showErrorMessage(error.message);
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
};

const ontagInput = () => {
  pristine.validate(hashtagInput);
};

const onComInput = () => {
  pristine.validate(commentInput);
};

const initFormValidation = () => {
  form.addEventListener('submit', onFormSubmit);
  hashtagInput.addEventListener('input', ontagInput);
  commentInput.addEventListener('input', onComInput);
};

const resetFormValidation = () => {
  pristine.reset();
  hashtagInput.value = '';
  commentInput.value = '';
};

export { initFormValidation, resetFormValidation, showErrorMessage, blockSubmitButton, unblockSubmitButton };
