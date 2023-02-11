
import './App.css';
import {useEffect, useState} from 'react';

function App() {
 const[latitude,setLatitude]=useState();
 const[longitude,setLongitude]=useState();
 const[city, setCity] = useState('');
 const[state, setState]=useState('');
 const[currentTemp, setcurrentTemp] = useState();
 const[inpCity,setinpCity]=useState('');
 const[customLat,setCustomLat]=useState(''); 
 const[customLong,setCustomLong]=useState('');
 const[customTemp,setCustomTemp]=useState();
 useEffect(()=>{
  navigator.geolocation.getCurrentPosition((position)=>{
  console.log(position.coords);
  setLatitude(position.coords.latitude);
  setLongitude(position.coords.longitude);
  const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
fetch(geoUrl)
.then(res => res.json())
.then(data =>{
 console.log(data);
 setCity(data.city);
 setState(data.principalSubdivision)
})
});
 });
const weatherApiCurrent = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  const getWeatherCurrent = () => fetch(weatherApiCurrent)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    setcurrentTemp(data.current_weather.temperature);
  
  });
  const weatherApiCustom = `http://api.openweathermap.org/geo/1.0/direct?q=${inpCity}&limit=1&appid=b82efa1d95b00bf3c54041947d07a6d4`;
const getWeatherCustom = async() => fetch(weatherApiCustom)
.then(res => res.json())
.then(data => {
  console.log(data);
  setCustomLat(data[0].lat);
  setCustomLong(data[0].lon);
 
})
const weatherApiTemp = `https://api.open-meteo.com/v1/forecast?latitude=${customLat}&longitude=${customLong}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  const getWeatherInDegrees = () => fetch(weatherApiTemp)
  .then(res => res.json())
  .then(data => {
    console.log(data.current_weather.temperature);
    setCustomTemp(data.current_weather.temperature+"°C");
  
  });
  return (
    <div className="App">
    <h1>Current city</h1>
    <h3>Place : {city}, {state}</h3>
  <button onClick={getWeatherCurrent}>Fetch weather for current city</button>
  <h1>Temperature: {currentTemp} °C</h1>
  <input type="text" placeholder='Enter the city' onChange={(e)=>setinpCity(e.target.value)}/>
  <button onClick={getWeatherCustom}>Find!</button>
  <p>{customLat} || {customLong}</p>
  <button onClick={getWeatherInDegrees}>Click</button>
  <h3>Temp: {customTemp}</h3>
     </div>
   
  );
}

export default App;
