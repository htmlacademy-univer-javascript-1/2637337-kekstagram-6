const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const editingImage = document.querySelector('.img-upload__preview img');

let currentScale = Scale.DEFAULT;

const updateScale = () => {
  scaleValue.value = `${currentScale}%`;
  editingImage.style.transform = `scale(${currentScale / 100})`;
};

const onScaleSmallerButtonClick = () => {
  currentScale = Math.max(Scale.MIN, currentScale - Scale.STEP);
  updateScale();
};

const onScaleBiggerButtonClick = () => {
  currentScale = Math.min(Scale.MAX, currentScale + Scale.STEP);
  updateScale();
};

// Удаление обработчиков
const removeScaleEventListeners = () => {
  if (scaleSmallerButton) {
    scaleSmallerButton.removeEventListener('click', onScaleSmallerButtonClick);
  }
  if (scaleBiggerButton) {
    scaleBiggerButton.removeEventListener('click', onScaleBiggerButtonClick);
  }
};

// Сброс масштаба
const cleanupScale = () => {
  currentScale = Scale.DEFAULT;
  updateScale();
};

// Инициализация масштаба
const initScale = () => {
  // Удаляем старые обработчики
  removeScaleEventListeners();
  // Добавляем новые обработчики
  scaleSmallerButton.addEventListener('click', onScaleSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onScaleBiggerButtonClick);
  // Устанавливаем начальное значение
  cleanupScale();
};

// Полный сброс
const resetScale = () => {
  removeScaleEventListeners();
  cleanupScale();
};

export { initScale, resetScale };
