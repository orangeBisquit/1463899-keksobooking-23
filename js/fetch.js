const AD_FORM = document.querySelector('.ad-form');

const ADS_DATA_ADDRESS = 'https://23.javascript.pages.academy/keksobooking/data';
const FORM_ADDRESS = 'https://23.javascript.pages.academy/keksobooking';

// -------------------------------------
const getAdsData = (filterData, employData, onError) =>
  fetch(ADS_DATA_ADDRESS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError();
      }
    })
    .then((adsData) => filterData(adsData))
    .then((filteredData) => {
      employData(filteredData);
    })
    .catch(() => {
      onError();
    });

const listenFormSubmit = (onSuccess, onError) => {
  AD_FORM.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(FORM_ADDRESS, { method: 'POST', body: formData })
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          onError();
        }
      },
      );
  });
};

export { getAdsData, listenFormSubmit };
