import { createCard } from "./render-card.js";

const AD_ADDRESS = document.querySelector("#address");
const MAP = L.map("map-canvas");

const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR = [26, 52];
const MAIN_ICON_PROPS = {
  iconUrl: "../img/main-pin.svg",
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
};

const PIN_SIZE = [40, 40];
const PIN_AHCHOR = [40, 40];
const ICON_PROPS = {
  iconUrl: "../img/pin.svg",
  iconSize: PIN_SIZE,
  iconAnchor: PIN_AHCHOR,
};

const TOKYO_LAT = 35.67481276374844;
const TOKYO_LNG = 139.7485999914352;
const TOKYO_COORDS = {
  lat: TOKYO_LAT,
  lng: TOKYO_LNG,
};

const initMap = (onload) => {
  MAP.on("load", onload).setView(TOKYO_COORDS, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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

const setFormAddress = () => {
  const pinLat = mainMarker._latlng.lat;
  const pinLng = mainMarker._latlng.lng;

  AD_ADDRESS.value = `${pinLat}, ${pinLng}`;
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
      lat: markerData.location.lat,
      lng: markerData.location.lng,
    },
    {
      icon,
    }
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

const enableMap = (onload, adsData) => () => {
  initMap(onload);
  setMainPin();
  mainMarker.on("dragend", showSimilarAds(adsData));
};

export { enableMap, resetMainMarker };
