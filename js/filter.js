import { getRandomItems } from './util.js';

const MAXIMUM_ADS = 10;

const applyFilters = (data) => {
  // Здесь будут другие фильтры
  const shuffledData = getRandomItems(data);
  return shuffledData.slice(0, MAXIMUM_ADS);
};

export { applyFilters };
