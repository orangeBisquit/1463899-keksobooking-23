import { createCard, updateMarkers } from './render-card.js';
import { setFormAddress } from './form.js';
import { roundToDecimals } from './util.js';

const MAP = L.map('map-canvas');

const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR = [26, 52];
const MAIN_ICON_PROPS = {
  iconUrl: '../img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
};

const PIN_SIZE = [40, 40];
const PIN_ANCHOR = [40, 40];
const ICON_PROPS = {
  iconUrl: '../img/pin.svg',
  iconSize: PIN_SIZE,
  iconAnchor: PIN_ANCHOR,
};

const TOKYO_LAT = 35.67481;
const TOKYO_LNG = 139.74859;
const TOKYO_COORDS = {
  lat: TOKYO_LAT,
  lng: TOKYO_LNG,
};

const MAP_SOURCE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const initMap = (onload) => {
  MAP.on('load', onload).setView(TOKYO_COORDS, 13);

  L.tileLayer(MAP_SOURCE, {
    attribution: MAP_ATTRIBUTION,
  }).addTo(MAP);
};

let mainMarker;

const setMainPin = () => {
  const mainPinIcon = L.icon(MAIN_ICON_PROPS);

  mainMarker = L.marker(TOKYO_COORDS, {
    draggable: true,
    icon: mainPinIcon,
  });

  mainMarker.addTo(MAP);
};

const resetMainMarker = () => {
  mainMarker.setLatLng(TOKYO_COORDS);

  MAP.setView(TOKYO_COORDS);
};

const markerGroup = L.layerGroup().addTo(MAP);

const createMarker = (markerData) => {
  const icon = L.icon(ICON_PROPS);

  const marker = L.marker(
    {
      lat: roundToDecimals(markerData.location.lat, 5),
      lng: roundToDecimals(markerData.location.lng, 5),
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createCard(markerData), { keepInView: true });
};

const clearPins = () => {
  markerGroup.clearLayers();
};

const handleMarkerMove = () => {
  mainMarker.on('dragend', updateMarkers);
};

const enableMap = (onload) => {
  initMap(onload);
  setMainPin();
  setFormAddress();
  handleMarkerMove();
};

export { enableMap, resetMainMarker, createMarker, mainMarker, clearPins };
