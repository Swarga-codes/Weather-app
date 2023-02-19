import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [loader, setLoader] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [currentTemp, setcurrentTemp] = useState();
  const [inpCity, setinpCity] = useState("");
  const [customTemp, setCustomTemp] = useState();
  const [windSpeed, setwindSpeed] = useState();
  const [Humidity, setHumidity] = useState();
  const[notFound,setNotFound]=useState('');
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      //fetching the details about the current city
      const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      fetch(geoUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoader(false);
          setCity(data.city);
          setState(data.principalSubdivision);
        });
    });
 
  const weatherApiCurrent = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;
  //fetching the weather of the current city
  const getWeatherCurrent = () =>
    fetch(weatherApiCurrent)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setcurrentTemp(data.current_weather.temperature + "°C");
      });
      getWeatherCurrent();
       });
  //fetching the weather of the given input city
  const getCustomWeather = () =>
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inpCity}&appid=b82efa1d95b00bf3c54041947d07a6d4`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotFound('');
        setCustomTemp(parseFloat(data.main.temp - 273.15).toFixed(2) + "°C");
        setwindSpeed(data.wind.speed + "km/hr");
        setHumidity(data.main.humidity + "%");
      }).catch((err)=>{
        console.log(err);
        setNotFound('City Not Found');
      });
  return (
    <div className="App">
    <nav className="navbar bg-light-dark">
    <div className="container-fluid">
      <span className="navbar-brand mb-0 h1" id="nav-title">My Weather App</span>
    </div>
  </nav>
      {loader ? (
        <h3>Loading...</h3>
      ) : (
        <>
        <h3>
          Current City : {city}, {state}
        </h3>
        <h3>Temperature: {currentTemp}</h3>
        </>
      )}
    
      <input
        type="text"
        placeholder="Enter the city"
        onChange={(e) => setinpCity(e.target.value)}
        className='input_city'
      />
      <br />
      <button onClick={getCustomWeather} className='btn btn-primary'>Search Weather!</button>
      <div className="search_results">
      {notFound?
      <h3>{notFound}</h3>
      :
      <>
      <h3>Temperature: {customTemp}</h3>
      <h3>Windspeed: {windSpeed}</h3>
      <h3>Humidity : {Humidity}</h3>
      </>
      }
     
      </div>
    
    </div>
  );
}

export default App;
