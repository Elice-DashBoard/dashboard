import React, { useState, useEffect } from "react";
import axios from "axios";
import useGeolocation from "../hooks/useGeolocation";
import { styled } from "styled-components";

const Weather = () => {
  const { latitude, longitude, error } = useGeolocation();

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // 현재 위치 가져오기
    const option = {
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`,
    };
    latitude &&
      longitude &&
      axios(option)
        .then((res) => {
          console.log(res.data);
          setWeather(res.data);
        })
        .catch((err) => console.log(err));
  }, [latitude, longitude]);

  if (!weather) {
    return <div>Loading...</div>;
  } else if (error) {
    return <p>Error: {error}</p>;
  } else if (latitude === null || longitude === null) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Div>
        <H2>Current location</H2>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
      </Div>
      <Div>
        <H2>Current Weather</H2>
        <p>
          Location: {weather.name}, {weather.sys.country}
        </p>
        <p>Temperature: {(weather.main.temp - 273.15).toFixed(1)}°C</p>
        <p>Weather: {weather.weather[0].main}</p>
      </Div>
    </Container>
  );
};

export default Weather;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const H2 = styled.h2`
  font-size: var(--fs-sm);
`;
