
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const[loader,setLoader]=useState(true);
 const[latitude,setLatitude]=useState();
 const[longitude,setLongitude]=useState();
 const[city, setCity] = useState('');
 const[state, setState]=useState('');
 const[currentTemp, setcurrentTemp] = useState();
 const[inpCity,setinpCity]=useState('');
 const[customLat,setCustomLat]=useState(''); 
 const[customLong,setCustomLong]=useState('');
 const[customTemp,setCustomTemp]=useState();
const[windSpeed,setwindSpeed]=useState();
const[Humidity,setHumidity]=useState();
 useEffect(()=>{
  navigator.geolocation.getCurrentPosition((position)=>{
  console.log(position.coords);
  setLatitude(position.coords.latitude);
  setLongitude(position.coords.longitude);
  //fetching the details about the current city
  const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
fetch(geoUrl)
.then(res => res.json())
.then(data =>{
 console.log(data);
 setLoader(false);
 setCity(data.city);
 setState(data.principalSubdivision)
})
});
 });
const weatherApiCurrent = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
//fetching the weather of the current city 
const getWeatherCurrent = () => fetch(weatherApiCurrent)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    setcurrentTemp(data.current_weather.temperature+"°C");
  
  });
  const weatherApiCustom = `http://api.openweathermap.org/geo/1.0/direct?q=${inpCity}&limit=1&appid=b82efa1d95b00bf3c54041947d07a6d4`;
  const weatherApiTemp = `https://api.open-meteo.com/v1/forecast?latitude=${customLat}&longitude=${customLong}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  //fetching the latitude and longitude of the given city
  const getWeatherCustom = async() => {
  const getData = await fetch(weatherApiCustom).then(res => res.json())
.then(data => {
  console.log(data);
  setCustomLat(data[0].lat);
  setCustomLong(data[0].lon);
  //fetching the weather using the latitude and longitude
  fetch(weatherApiTemp)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  
    setCustomTemp(data.current_weather.temperature+"°C");
    setwindSpeed(data.current_weather.windspeed+"km/h");
    setHumidity(data.hourly.relativehumidity_2m[data.hourly.relativehumidity_2m.length-1]+"%");
  })
})
  };

  // const getWeatherInDegrees = () => 
  return (
    <div className="App">
    <h1>Weather App</h1>
    <p>by</p>
    <h4>Markus</h4>
    <h2>Current city</h2>
    {loader? <h3>Loading...</h3>:
    <h3>Place : {city}, {state}</h3>
  }
  <button onClick={getWeatherCurrent}>Fetch weather for current city</button>
  <h3>Temperature: {currentTemp}</h3>
  <input type="text" placeholder='Enter the city' onChange={(e)=>setinpCity(e.target.value)}/>
  <button onClick={getWeatherCustom}>Find!</button>
  <h3>Temp: {customTemp}</h3>
  <h3>Windspeed: {windSpeed}</h3>
  <h3>Humidity : {Humidity}</h3>
     </div>
   
  );
}

export default App;
