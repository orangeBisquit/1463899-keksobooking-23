let rawData;
let processedData;

const storeData = (data) => {
  rawData = data;
};

const prepareData = (process) => {
  processedData = process(rawData);
};

const processData = (data, applyFilters) => {
  storeData(data);
  prepareData(applyFilters);
};

const getData = () => processedData;

export { processData, getData };


// const storeData = (data) => {
//   const Data = data;

//   return () => Data;
// };

// const getData = storeData();

// const rawData = getData();

// console.log(rawData);

// export { getData }

