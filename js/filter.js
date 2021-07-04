import { updateMarkers } from './render-card.js';
import { prepareData } from './store-data.js';

const mapFilters = document.querySelector('.map__filters');
const housingTypeFilter = mapFilters.querySelector('#housing-type');
const housingPriceFilter = mapFilters.querySelector('#housing-price');
const housingRoomsFilter = mapFilters.querySelector('#housing-rooms');
const housingGuestsFilter = mapFilters.querySelector('#housing-guests');

const PriceKeys = {
  'low': 10000,
  'high': 50000,
};
const MAXIMUM_ADS = 10;
const FILTER_TYPE_ANY = 'any';

// ----------------------------------

const getFeatures = (elem) => {
  const checkedHousingFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');

  return Array.from(checkedHousingFeatures).every((checkedFeature) => {
    if (elem.offer.features) {
      return elem.offer.features.includes(checkedFeature.value);
    }
  });
};

const getHousingType = (elem) => housingTypeFilter.value === FILTER_TYPE_ANY ? true : housingTypeFilter.value === elem.offer.type;

const getHousingPrice = (elem) => {
  switch (housingPriceFilter.value) {
    case 'low':
      return elem.offer.price < PriceKeys.low;
    case 'middle':
      return elem.offer.price >= PriceKeys.low && elem.offer.price <= PriceKeys.high;
    case 'high':
      return elem.offer.price > PriceKeys.high;
    default:
      return true;
  }
};

const getRoomsNumber = (elem) => housingRoomsFilter.value === FILTER_TYPE_ANY ? true : parseInt(housingRoomsFilter.value, 10) === elem.offer.rooms;

const getGuestsNumber = (elem) => housingGuestsFilter.value === FILTER_TYPE_ANY ? true : parseInt(housingGuestsFilter.value, 10) === elem.offer.guests;

// -----------------------------------
const applyFilters = (data) => {
  const filteredData = data.filter((elem) => getHousingType(elem) && getHousingPrice(elem) && getRoomsNumber(elem) && getGuestsNumber(elem) && getFeatures(elem));

  return filteredData.slice(0, MAXIMUM_ADS);
};

mapFilters.addEventListener('change', () => {
  prepareData(applyFilters);
  updateMarkers();
});

export { applyFilters };
