
import './App.css';
import {useEffect, useState} from 'react';

function App() {
 const[latitude,setLatitude]=useState();
 const[longitude,setLongitude]=useState();
 const[city, setCity] = useState('');
 const[state, setState]=useState('');
 const[currentTemp, setcurrentTemp] = useState();

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
const weatherApi = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  const getWeather = () => fetch(weatherApi)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    setcurrentTemp(data.current_weather.temperature);
  
  });


  return (
    <div className="App">
    <h1>Latitude : {latitude}</h1>
    <h1>Longitude : {longitude}</h1>
    <h1>Place : {city}, {state}</h1>
  <button onClick={getWeather}>Fetch weather json</button>
  <h1>Temperature: {currentTemp} °C</h1>
     </div>
   
  );
}

export default App;
