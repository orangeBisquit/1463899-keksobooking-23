import './page-state.js';
import './form.js';
import { renderMarkers } from './leaflet-map.js';
import { getAds } from './data.js';

const adsData = getAds();

renderMarkers(adsData);
