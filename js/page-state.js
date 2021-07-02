import { enableFormValidation, disableFormValidation } from './form.js';

const AD_FORM = document.querySelector('.ad-form');
const MAP_FILTERS = document.querySelector('.map__filters');

const disableForm = (form, selectors, disableClass) => {
  const controls = form.querySelectorAll(selectors);

  form.classList.add(disableClass);

  controls.forEach((control) => {
    control.setAttribute('disabled', true);
  });
};

const enableForm = (form, selectors, disableClass) => {
  const controls = form.querySelectorAll(selectors);

  form.classList.remove(disableClass);

  controls.forEach((control) => {
    control.removeAttribute('disabled');
  });
};

const disablePage = () => {
  disableForm(AD_FORM, '.ad-form__element', 'ad-form--disabled');
  disableForm(MAP_FILTERS, 'select, fieldset', 'map__filters--disabled');

  disableFormValidation();
};

const enablePage = () => {
  enableForm(AD_FORM, '.ad-form__element', 'ad-form--disabled');
  enableForm(MAP_FILTERS, 'select, fieldset', 'map__filters--disabled');

  enableFormValidation();
};

export { disablePage, enablePage };
