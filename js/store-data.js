let rawData;
let processedData;

const storeData = (data) => {
  rawData = data;
};

const prepareData = (process) => {
  processedData = process(rawData);
};

const getData = () => processedData;

export { storeData, prepareData, getData };
