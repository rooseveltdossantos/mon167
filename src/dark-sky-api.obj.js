'use strict';

var _darkSkyApi = require('dark-sky-api');

var _darkSkyApi2 = _interopRequireDefault(_darkSkyApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_darkSkyApi2.default.apiKey = '4e4dc8fd7239369835bb7ec33892980d';

// optional configuration 
_darkSkyApi2.default.units = 'si'; // default 'us' 
_darkSkyApi2.default.language = 'pt'; // default 'en' 
_darkSkyApi2.default.postProcessor = function (item) {
  // default null; 
  item.day = item.dateTime.format('ddd');
  return item;
};

_darkSkyApi2.default.loadCurrent().then(function (result) {
  return console.log(result);
});
