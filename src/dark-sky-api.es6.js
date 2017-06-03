import DarkSkyApi from 'dark-sky-api';

DarkSkyApi.apiKey = '4e4dc8fd7239369835bb7ec33892980d';
 
// optional configuration 
DarkSkyApi.units = 'si'; // default 'us' 
DarkSkyApi.language = 'pt'; // default 'en' 
DarkSkyApi.postProcessor = (item) => { // default null; 
  item.day = item.dateTime.format('ddd');
  return item;
}

DarkSkyApi.loadCurrent()
  .then(result => console.log(result));