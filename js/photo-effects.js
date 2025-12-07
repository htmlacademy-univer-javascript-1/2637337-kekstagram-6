const EFFECTS = {
  none: { filter: '', min: 0, max: 0, step: 0, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
};

const editingImage = document.querySelector('.img-upload__preview img');
const effectRadios = document.querySelectorAll('.effects__radio');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');

let currentEffect = 'none';

// Инициализация слайдера
const initSlider = () => {
  if (!effectLevelSlider || effectLevelSlider.noUiSlider) {
    return;
  }

  window.noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });
};

// Обновление настроек слайдера
const updateSliderOptions = (effect) => {
  const effectData = EFFECTS[effect];
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: effectData.min,
        max: effectData.max,
      },
      start: effectData.max,
      step: effectData.step
    });
  }
};

// Применение эффекта к изображению
const applyEffect = (effect, value) => {
  const effectData = EFFECTS[effect];
  editingImage.style.filter = `${effectData.filter}(${value}${effectData.unit})`;
};

// Очистка эффекта
const cleanupEffect = () => {
  editingImage.style.filter = 'none';
  effectLevelValue.value = '';
};

// Обработчик обновления слайдера
const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;

  if (currentEffect !== 'none') {
    applyEffect(currentEffect, sliderValue);
  }
};

// Обработчик изменения эффекта
const onEffectChangeHandler = (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    effectLevel.style.display = 'none';
    cleanupEffect();
  } else {
    effectLevel.style.display = 'block';
    const effectData = EFFECTS[currentEffect];
    applyEffect(currentEffect, effectData.max);
    updateSliderOptions(currentEffect);
  }
};

// Удаление обработчиков событий
const removeEffectEventListeners = () => {
  effectRadios.forEach((radio) => {
    radio.removeEventListener('change', onEffectChangeHandler);
  });

  if (effectLevelSlider && effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.off('update');
  }
};

// Инициализация эффектов
const initEffects = () => {
  // Создаем слайдер
  initSlider();

  // Добавляем обработчики
  if (effectLevelSlider && effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
  }

  effectRadios.forEach((radio) => {
    radio.addEventListener('change', onEffectChangeHandler);
  });

  // Скрываем слайдер по умолчанию
  if (effectLevel) {
    effectLevel.style.display = 'none';
  }

  // Устанавливаем эффект по умолчанию
  const noneEffectRadio = document.querySelector('#effect-none');
  if (noneEffectRadio) {
    noneEffectRadio.checked = true;
  }

  // Очищаем эффект
  cleanupEffect();
  currentEffect = 'none';
};

// Сброс эффектов
const resetEffects = () => {
  // Удаляем обработчики
  removeEffectEventListeners();

  // Сбрасываем состояние
  cleanupEffect();
  currentEffect = 'none';

  // Скрываем слайдер
  if (effectLevel) {
    effectLevel.style.display = 'none';
  }

  // Сбрасываем выбор эффекта
  const noneEffectRadio = document.querySelector('#effect-none');
  if (noneEffectRadio) {
    noneEffectRadio.checked = true;
  }

  // Сбрасываем настройки слайдера
  if (effectLevelSlider && effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: { min: 0, max: 100 },
      start: 100,
      step: 1
    });
  }
};

export { initEffects, resetEffects };
