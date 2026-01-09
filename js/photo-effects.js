const EFFECTS = {
  none: { filter: '', min: 0, max: 0, step: 0, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
};

const editingImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelectorAll('.effects__radio');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level');

let currentEffect = 'none';

const setEffectValue = (value, step) => {
  const num = parseFloat(value);

  if (step === 1) {
    return Math.round(num).toString();
  }

  return num % 1 === 0 ? num.toString() : num.toFixed(1);
};

noUiSlider.create(effectLevelSlider, {
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

effectLevel.classList.add('hidden');
effectLevelValue.value = '';

const updateSliderOptions = (effect) => {
  const effectData = EFFECTS[effect];

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effectData.min,
      max: effectData.max,
    },
    start: effectData.max,
    step: effectData.step,
    format: {
      to: function (value) {
        return setEffectValue(value, effectData.step);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });
  effectLevelValue.value = setEffectValue(effectData.max, effectData.step);
};

const applyEffect = (effect, value) => {
  const effectData = EFFECTS[effect];
  editingImage.style.filter = `${effectData.filter}(${value}${effectData.unit})`;
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  const effectData = EFFECTS[currentEffect];

  effectLevelValue.value = setEffectValue(sliderValue, effectData.step);

  if (currentEffect !== 'none') {
    applyEffect(currentEffect, sliderValue);
  }
};

const onEffectChangeHandler = (evt) => {
  const newEffect = evt.target.value;
  if (newEffect === currentEffect) {
    return;
  }

  currentEffect = newEffect;

  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
    editingImage.style.filter = 'none';
    effectLevelValue.value = '';
  } else {
    effectLevel.classList.remove('hidden');
    const effectData = EFFECTS[currentEffect];
    effectLevelValue.value = setEffectValue(effectData.max, effectData.step);

    applyEffect(currentEffect, effectData.max);
    updateSliderOptions(currentEffect);
  }
};

const initEffects = () => {
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

  if (effectsList.length > 0) {
    effectsList.forEach((effectElement) => {
      effectElement.addEventListener('change', onEffectChangeHandler);
    });
  }
};

const resetEffects = () => {
  currentEffect = 'none';
  effectLevel.classList.add('hidden');
  effectLevelValue.value = '';
  editingImage.style.filter = 'none';
  effectLevelSlider.noUiSlider.off('update');

  if (effectsList.length > 0) {
    effectsList.forEach((effectElement) => {
      effectElement.removeEventListener('change', onEffectChangeHandler);
    });
  }

  effectLevelSlider.noUiSlider.updateOptions({
    range: { min: 0, max: 100 },
    start: 100,
    step: 1
  });
};

export { initEffects, resetEffects };
