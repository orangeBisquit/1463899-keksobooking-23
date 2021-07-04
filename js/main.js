import { AD_FORM, handleSubmitSuccess } from './form.js';
import { disablePage, enablePage } from './page-state.js';
import { createPins } from './render-card.js';
import { enableMap } from './leaflet-map.js';
import { loadData, listenFormSubmit } from './fetch.js';
import { postDataError, getDataError } from './message.js';
import { applyFilters } from './filter.js';
import { storeData, prepareData, getData } from './store-data.js';
import './debounce.js';

const handleLoadSuccess = (loadedData) => {
  storeData(loadedData);
  prepareData(applyFilters);
  createPins(getData());
};

disablePage();

enableMap(enablePage);

loadData(handleLoadSuccess, getDataError);

listenFormSubmit(AD_FORM, handleSubmitSuccess, postDataError);

