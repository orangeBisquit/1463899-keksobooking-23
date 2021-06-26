import { enablePage } from './page-state.js';
import { getAds } from './data.js';
import { createCard } from './render-card.js';

const AD_ADDRESS = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
  })
  .setView(
    {
      lat: 35.67481276374844,
      lng: 139.7485999914352,
    },
    13,
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.67481276374844,
    lng: 139.7485999914352,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setFormAddress = () => {
  const pinLat = mainMarker._latlng.lat;
  const pinLng = mainMarker._latlng.lng;

  AD_ADDRESS.value = `${pinLat}, ${pinLng}`;
};

mainMarker.addTo(map);

mainMarker.on('dragend', setFormAddress);

const resetMainPin = () => {
  mainMarker.setLatLng({
    lat: 35.67481276374844,
    lng: 139.7485999914352,
  });

  map.setView({
    lat: 35.67481276374844,
    lng: 139.7485999914352,
  });
};

const markerGroup = L.layerGroup().addTo(map);

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

const renderMarkers = (markersData) => {
  markersData.forEach((item) => {
    createMarker(item);
  });
};

const adsData = getAds();

renderMarkers(adsData);

export { resetMainPin };
