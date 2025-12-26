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
const effectsPreview = document.querySelectorAll('.effects__preview');

let currentEffect = 'none';

const updateMiniPreviews = () => {
  const imgSrc = editingImage.src;
  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = `url(${imgSrc})`;
    const effectClass = preview.className.match(/effects__preview--(\w+)/);
    if (effectClass) {
      const effect = effectClass[1];
      const effectData = EFFECTS[effect];
      preview.style.filter = effect === 'none'
        ? 'none'
        : `${effectData.filter}(${effectData.max}${effectData.unit})`;
    }
  });
};

const initSlider = () => {
  if (!effectLevelSlider) {return;}

  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }

  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower'
  });
};

const updateSliderOptions = (effect) => {
  const effectData = EFFECTS[effect];
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min: effectData.min, max: effectData.max },
    start: effectData.max,
    step: effectData.step
  });
};

const applyEffect = (effect, value) => {
  const effectData = EFFECTS[effect];
  editingImage.style.filter = effect === 'none'
    ? 'none'
    : `${effectData.filter}(${value}${effectData.unit})`;
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  if (currentEffect !== 'none') {applyEffect(currentEffect, sliderValue);}
};

const onEffectChangeHandler = (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    effectLevel.style.display = 'none';
    applyEffect('none', 0);
  } else {
    effectLevel.style.display = 'block';
    const effectData = EFFECTS[currentEffect];
    applyEffect(currentEffect, effectData.max);
    updateSliderOptions(currentEffect);
  }
};

const removeEffectEventListeners = () => {
  effectRadios.forEach((radio) =>
    radio.removeEventListener('change', onEffectChangeHandler)
  );
  effectLevelSlider.noUiSlider.off('update');
};

const initEffects = () => {
  initSlider();
  updateMiniPreviews();

  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

  effectRadios.forEach((radio) =>
    radio.addEventListener('change', onEffectChangeHandler)
  );

  effectLevel.style.display = 'none';
  currentEffect = 'none';
  editingImage.style.filter = 'none';
};

const resetEffects = () => {
  removeEffectEventListeners();
  currentEffect = 'none';
  editingImage.style.filter = 'none';
  effectLevel.style.display = 'none';
  updateMiniPreviews();
};

export { initEffects, resetEffects };
