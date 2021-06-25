const map = L.map('map-canvas')
  .on('load', () => {})
  .setView(
    {
      lat: 35.74205383068037,
      lng: 139.83755498193207,
    },
    10,
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../leaflet/images/marker-icon.png',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.74205383068037,
    lng: 139.83755498193207,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

