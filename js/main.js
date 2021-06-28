import { disablePage,enablePage } from './page-state.js';
import './form.js';
import { enableMap } from './leaflet-map.js';
import { getAds } from './data.js';

disablePage();

const adsData = getAds();

setTimeout(enableMap(enablePage, adsData), 1000);
