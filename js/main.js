import { handleSubmitSuccess } from './form.js';
import { disablePage, enablePage } from './page-state.js';
import { handleSimilarAds, createPins } from './render-card.js';
import { enableMap } from './leaflet-map.js';
import { getAdsData, listenFormSubmit } from './fetch.js';
import { postDataError } from './message.js';
import { applyFilters } from './filter.js';

disablePage();

enableMap(enablePage);

handleSimilarAds(getAdsData, applyFilters, createPins, postDataError);

listenFormSubmit(handleSubmitSuccess, postDataError);
