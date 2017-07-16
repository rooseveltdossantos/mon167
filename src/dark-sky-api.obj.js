'use strict';

var _darkSkyApi = require('dark-sky-api');

var _darkSkyApi2 = _interopRequireDefault(_darkSkyApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Polyfill: string.padStart
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    padString = String(padString || ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}

function atualizarTemperaturasDoPainel() {

  function atualizarTemperatura() {
    var temperature = document.getElementById("temperature");
    var minTemperature = document.getElementById("minTemperature");
    var maxTemperature = document.getElementById("maxTemperature");

    console.log("Iniciando chamada a Dark-Sky-Api");

    try {
      _darkSkyApi2.default.apiKey = '4e4dc8fd7239369835bb7ec33892980d';

      _darkSkyApi2.default.units = 'si';
      _darkSkyApi2.default.language = 'pt';
      _darkSkyApi2.default.postProcessor = function (item) {
        item.day = item.dateTime.format('ddd');
        return item;
      };

      var skycons = new Skycons();

      _darkSkyApi2.default.loadItAll('alerts,flags,minutely').then(function (result) {
        console.log(result);
        skycons.add("iWeather", result.currently.icon);

        temperature.innerHTML = Math.trunc(result.currently.temperature);

        var today = result.daily.data[0];
        console.log(today);

        if (today !== null) {
          var vMinTemperature = Math.trunc(today.temperatureMin);
          var vMaxTemperature = Math.trunc(today.temperatureMax);
          minTemperature.innerHTML = vMinTemperature;
          maxTemperature.innerHTML = vMaxTemperature;
        } else {
          minTemperature.innerHTML = "?";
          maxTemperature.innerHTML = "?";
        }
      });

      skycons.play();
    } catch (ex) {
      console.log('error:', ex.message);
    }
  }

  atualizarTemperatura();
  setInterval(atualizarTemperatura, 1000 * 60 * 5);
}

function ligarRelogio() {

  function atualizarDataHora() {
    try {
      var diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
      var mesesDoAno = ['JAN', 'FEV', 'MAR', 'ABR', 'MAIO', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
      var dia = document.getElementById("dia");
      var now = new Date();
      var msgDia = diasDaSemana[now.getDay()] + ', ' + now.getDate() + ' DE ' + mesesDoAno[now.getMonth()] + '/' + now.getFullYear();
      dia.innerHTML = msgDia;
      var relogio = document.getElementById("relogio");
      var msgRelogio = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
      relogio.innerHTML = msgRelogio;
    } catch (error) {
      console.log(error);
    }
  }

  setInterval(atualizarDataHora, 1000);
}

atualizarTemperaturasDoPainel();
ligarRelogio();

//https://api.darksky.net/forecast/4e4dc8fd7239369835bb7ec33892980d/-26.907443699999998,-49.0853849?exclude=alerts,currently,flags,hourly,minutely&lang=pt&units=si&callback=jsonp_1496884098703_80884
//https://api.darksky.net/forecast/4e4dc8fd7239369835bb7ec33892980d/-26.907443699999998,-49.0853849?exclude=alerts,daily,flags,hourly,minutely&lang=pt&units=si&callback=jsonp_1496884442473_9121
