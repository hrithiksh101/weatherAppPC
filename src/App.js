import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const MyKey = '2db3c3a1eda52c138376d2b57d9cf0df';

  const [query, setQuery] = useState('Nigeria');
  const [weather, setWeather] = useState(null);
  const [temp,setTemp] = useState('app') ;

  // useEffect(() => {
  //   let response;

  //   try {
  //     const fetchData = async () => {
  //       response = await axios
  //         .get(
  //           `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${MyKey}`
  //         )
  //         .then((res) => res.data);

  //       console.log(response.main.temp);

  //       setWeather(parseInt(response.main.temp) - 272);
  //     };

  //     fetchData();
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   return;
  // }, []);

  const api = {
    key: MyKey,
    base: 'https://api.openweathermap.org/data/2.5',
  };

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();


    // now constructing a string from the above data

    return ` ${day} ${date} ${month} ${year} `;
  };

  let keeper10 = 0 ;

  const search = async (e) => {
    let response = null;

    if (e.key === 'Enter') {
      console.log('it was enter');

      // setQuery(e.target.value) ;

      console.log(query);

      response = await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${MyKey}`
        )
        .then((res) => res.data);

      console.log(response.weather[0].main);

      setWeather({
        temp: parseInt(response.main.temp),
        city: response.name,
        country: response.sys.country,
        type   : response.weather[0].main
      });

      if ( parseInt(response.main.temp)>= 15 ){
          keeper10 = 0 ;
          setTemp('app warm')
      }else {
        keeper10 = 1 ;
        setTemp('app cold')
      }

      console.log(weather);
    } 
  };

  

  return (
    <div className={temp}>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search.."
          onKeyPress={(e) => search(e)}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {weather ? (

        <div> 

        <h1 className="tempreature-box"  style={ keeper10 == 0 ?  {color: "#000000"} : { color : "#FFFFFF" } } >
          {' '}
          Current Tempreature of the city {weather.city} , {weather.country} is{' '} 

          <br/>



          {' '}
        

        </h1>

        <div className = "box" > <br/> {weather.temp} °C </div>
        <div className = "type" > { weather.type } </div>
        </div>
      ) : (
        <div>  </div>   
        
      )}
    </div>
  );
}

export default App;
