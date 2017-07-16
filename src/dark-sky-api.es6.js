import DarkSkyApi from 'dark-sky-api';

// Polyfill: string.padStart
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

function atualizarTemperaturasDoPainel()
{

  function atualizarTemperatura() {
    let temperature = document.getElementById("temperature");
    let minTemperature = document.getElementById("minTemperature");
    let maxTemperature = document.getElementById("maxTemperature");

    console.log("Iniciando chamada a Dark-Sky-Api");

    try 
    {
      DarkSkyApi.apiKey = '4e4dc8fd7239369835bb7ec33892980d'; 

      DarkSkyApi.units = 'si'; 
      DarkSkyApi.language = 'pt'; 
      DarkSkyApi.postProcessor = (item) => 
      { 
        item.day = item.dateTime.format('ddd');
        return item;
      }

      let skycons = new Skycons();

      DarkSkyApi.loadItAll('alerts,flags,minutely')
        .then(result => {
          console.log(result);
          skycons.add("iWeather", result.currently.icon);
          
          temperature.innerHTML = Math.trunc(result.currently.temperature);

          let today = result.daily.data[0];
          console.log(today);

          if (today !== null)
          {
            let vMinTemperature = Math.trunc(today.temperatureMin);
            let vMaxTemperature = Math.trunc(today.temperatureMax);
            minTemperature.innerHTML = vMinTemperature;
            maxTemperature.innerHTML = vMaxTemperature;
          }
          else
          {
            minTemperature.innerHTML = "?";
            maxTemperature.innerHTML = "?";
          }
        });

      skycons.play();
    }
    catch(ex)
    {
      console.log('error:', ex.message)
    }
  }

    atualizarTemperatura();
    setInterval(atualizarTemperatura, 1000 * 60 * 5);
}

function ligarRelogio()
{

  function atualizarDataHora()
  { 
    try {
      let diasDaSemana = ['DOM','SEG','TER','QUA','QUI','SEX', 'SAB'];
      let mesesDoAno = ['JAN', 'FEV','MAR','ABR','MAIO','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
      let dia = document.getElementById("dia");
      let now = new Date();    
      let msgDia = diasDaSemana[now.getDay()] + ', ' + now.getDate() + ' DE ' + mesesDoAno[now.getMonth()] + '/' + now.getFullYear();
      dia.innerHTML = msgDia;    
      let relogio = document.getElementById("relogio");
      let msgRelogio = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
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
