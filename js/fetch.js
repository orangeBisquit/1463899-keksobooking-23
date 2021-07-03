const ADS_DATA_ADDRESS = 'https://23.javascript.pages.academy/keksobooking/data';
const FORM_ADDRESS = 'https://23.javascript.pages.academy/keksobooking';

// -------------------------------------
const loadData = (onSuccess, onError) => {
  fetch(ADS_DATA_ADDRESS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError();
      }
    })
    .then((adsData) => {
      onSuccess(adsData);
    })
    .catch(() => {
      onError();
    });
};
const listenFormSubmit = (form, onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(FORM_ADDRESS, { method: 'POST', body: formData })
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          onError();
        }
      })
      .catch(() => {
        onError();
      });
  });
};

export { loadData, listenFormSubmit };
