const DEBOUNCE_INTERVAL = 500;

const debounce = (callback, timeoutDelay = DEBOUNCE_INTERVAL) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { debounce };
