import { isEscPress } from './util.js';

const pageBody = document.querySelector('body');
let errorButton = document.querySelector('.error__button');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// -------------------------------------
const removeMessage = () => {
  const successMessage = document.querySelector('.success');
  const errorMessage = document.querySelector('.error');

  if (successMessage) {
    successMessage.remove();
  } else if (errorMessage) {
    errorMessage.remove();
  }
};

const onPagePress = () => {
  removeMessage();

  document.removeEventListener('click', onPagePress);
};

const onEscPress = (evt) => {
  if (isEscPress(evt)) {
    removeMessage();

    document.removeEventListener('keydown', onEscPress);
  }
};

const onButtonPress = () => {
  removeMessage();

  errorButton.removeEventListener('click', onButtonPress);
};
// --------------------------------------

const postDataSuccess = () => {
  const successMessage = successTemplate.cloneNode(true);
  pageBody.appendChild(successMessage);

  document.addEventListener('click', onPagePress);
  document.addEventListener('keydown', onEscPress);
};

const postDataError = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  pageBody.appendChild(errorMessage);
  errorButton = document.querySelector('.error__button');

  document.addEventListener('click', onPagePress);
  document.addEventListener('keydown', onEscPress);
  errorButton.addEventListener('click', onButtonPress);
};
// -----------------------------------------------------

const getDataError = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Не удалось получить данные с сервера';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

export { getDataError, postDataSuccess, postDataError };

