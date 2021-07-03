import { AD_FORM, handleSubmitSuccess, setFormAddress } from './form.js';
import { disablePage, enablePage } from './page-state.js';
import { createPins } from './render-card.js';
import { enableMap, clearPins, mainMarker } from './leaflet-map.js';
import { loadData, listenFormSubmit } from './fetch.js';
import { postDataError, getDataError } from './message.js';
import { applyFilters } from './filter.js';
import { processData, getData } from './store-data.js';

const handleLoadSuccess = (adsData) => {
  processData(adsData, applyFilters);
  createPins(getData());
};

const updateMarkers = () => {
  clearPins();
  setFormAddress();
  createPins(getData());
};

const handleSimilarAds = () => {
  mainMarker.on('dragend', updateMarkers);
};

disablePage();

enableMap(enablePage);

loadData(handleLoadSuccess, getDataError);

handleSimilarAds();

listenFormSubmit(AD_FORM, handleSubmitSuccess, postDataError);

