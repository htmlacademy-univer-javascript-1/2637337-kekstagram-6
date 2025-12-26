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

const initSlider = () => {
  if (!effectLevelSlider) {return;}

  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }

  window.noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(1),
      from: (value) => parseFloat(value)
    }
  });
};

const updateSliderOptions = (effect) => {
  const effectData = EFFECTS[effect];
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: { min: effectData.min, max: effectData.max },
      start: effectData.max,
      step: effectData.step
    });
  }
};

const applyEffect = (effect, value) => {
  const effectData = EFFECTS[effect];
  if (editingImage) {
    editingImage.style.filter = effect === 'none' ? 'none' : `${effectData.filter}(${value}${effectData.unit})`;
  }
};

const cleanupEffect = () => {
  if (editingImage) {editingImage.style.filter = 'none';}
  if (effectLevelValue) {effectLevelValue.value = '';}
};

const onSliderUpdate = () => {
  if (!effectLevelSlider.noUiSlider) {return;}

  const sliderValue = effectLevelSlider.noUiSlider.get();
  if (effectLevelValue) {effectLevelValue.value = sliderValue;}

  if (currentEffect !== 'none') {
    applyEffect(currentEffect, sliderValue);
  }
};

const onEffectChangeHandler = (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    if (effectLevel) {effectLevel.style.display = 'none';}
    cleanupEffect();
  } else {
    if (effectLevel) {effectLevel.style.display = 'block';}
    const effectData = EFFECTS[currentEffect];
    applyEffect(currentEffect, effectData.max);
    updateSliderOptions(currentEffect);
  }
};

const removeEffectEventListeners = () => {
  effectRadios.forEach((radio) => radio.removeEventListener('change', onEffectChangeHandler));
  if (effectLevelSlider && effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.off('update');
  }
};

const initEffects = () => {
  if (!effectLevelSlider || !editingImage) {return;}

  initSlider();
  if (effectLevelSlider.noUiSlider) {effectLevelSlider.noUiSlider.on('update', onSliderUpdate);}
  effectRadios.forEach((radio) => radio.addEventListener('change', onEffectChangeHandler));
  if (effectLevel) {effectLevel.style.display = 'none';}

  const noneEffectRadio = document.querySelector('#effect-none');
  if (noneEffectRadio) {noneEffectRadio.checked = true;}

  cleanupEffect();
  currentEffect = 'none';
};

const resetEffects = () => {
  removeEffectEventListeners();
  cleanupEffect();
  currentEffect = 'none';
  if (effectLevel) {effectLevel.style.display = 'none';}

  const noneEffectRadio = document.querySelector('#effect-none');
  if (noneEffectRadio) {noneEffectRadio.checked = true;}

  if (effectLevelSlider && effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.updateOptions({ range: { min: 0, max: 100 }, start: 100, step: 1 });
  }
};

// Новые функции для photo-editing.js
const getCurrentEffect = () => currentEffect;

const getCurrentScale = () => {
  if (editingImage) {
    const transform = editingImage.style.transform;
    const match = transform.match(/scale\(([\d.]+)\)/);
    return match ? parseFloat(match[1]) : 1;
  }
  return 1;
};
export { initEffects, resetEffects, getCurrentEffect, getCurrentScale };
