import DarkSkyApi from 'dark-sky-api';

let temperature = document.getElementById("temperature");
let minTemperature = document.getElementById("minTemperature");
let maxTemperature = document.getElementById("maxTemperature");

DarkSkyApi.apiKey = '4e4dc8fd7239369835bb7ec33892980d'; 

DarkSkyApi.units = 'si'; 
DarkSkyApi.language = 'pt'; 
DarkSkyApi.postProcessor = (item) => { 
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

//https://api.darksky.net/forecast/4e4dc8fd7239369835bb7ec33892980d/-26.907443699999998,-49.0853849?exclude=alerts,currently,flags,hourly,minutely&lang=pt&units=si&callback=jsonp_1496884098703_80884
//https://api.darksky.net/forecast/4e4dc8fd7239369835bb7ec33892980d/-26.907443699999998,-49.0853849?exclude=alerts,daily,flags,hourly,minutely&lang=pt&units=si&callback=jsonp_1496884442473_9121
