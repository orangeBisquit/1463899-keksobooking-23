import { enablePage } from './page-state.js';
import './form.js';
import { enableMap } from './leaflet-map.js';
import { getAds } from './data.js';

const adsData = getAds();

enableMap(enablePage, adsData);
