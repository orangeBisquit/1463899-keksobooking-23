const DEBOUNCE_INTERVAL = 500;

function debounce(callback) {

  let timeoutId;

  return (...rest) => {

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), DEBOUNCE_INTERVAL);

  };
}

export { debounce };
