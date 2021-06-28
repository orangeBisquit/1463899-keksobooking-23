import { createCard } from './render-card.js';

const AD_ADDRESS = document.querySelector('#address');
const MAP = L.map('map-canvas');

const initMap = (onload) => {
  MAP.on('load', onload).setView(
    {
      lat: 35.67481276374844,
      lng: 139.7485999914352,
    },
    13,
  );
};

let mainMarker;

const setMainPin = () => {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(MAP);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  mainMarker = L.marker(
    {
      lat: 35.67481276374844,
      lng: 139.7485999914352,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainMarker.addTo(MAP);
};

const setFormAddress = () => {
  const pinLat = mainMarker._latlng.lat;
  const pinLng = mainMarker._latlng.lng;

  AD_ADDRESS.value = `${pinLat}, ${pinLng}`;
};

const resetMainMarker = () => {
  mainMarker.setLatLng({
    lat: 35.67481276374844,
    lng: 139.7485999914352,
  });

  MAP.setView({
    lat: 35.67481276374844,
    lng: 139.7485999914352,
  });
};

const markerGroup = L.layerGroup().addTo(MAP);

const createMarker = (markerData) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: markerData.location.lat,
      lng: markerData.location.lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createCard(markerData), { keepInView: true });
};

const renderMarkers = (adsData) => {
  adsData.forEach((item) => {
    createMarker(item);
  });
};

const showSimilarAds = (adsData) => () => {
  setFormAddress();
  renderMarkers(adsData);
};

const enableMap = (onload, adsData) => {
  initMap(onload);
  setMainPin();
  mainMarker.on('dragend', showSimilarAds(adsData));
};

export { enableMap, resetMainMarker };
