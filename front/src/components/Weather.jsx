import React, { useState, useEffect } from "react";
import axios from "axios";
import useGeolocation from "../hooks/useGeolocation";
import { styled } from "styled-components";
import mapPinIcon from "../assets/map-pin.svg";
import WeatherDescKo from "../utils/WeatherDescKo";

const cities = [
  { 서울: "seoul" },
  { 부산: "busan" },
  { 대구: "daegu" },
  { 인천: "incheon" },
  { 광주: "gwangju" },
  { 대전: "daejeon" },
  { 울산: "ulsan" },
  { 세종: "sejong" },
  { 제주: "jeju" },
];

const Weather = () => {
  const { latitude, longitude, error } = useGeolocation();
  const [selectedLocation, setSelectedLocation] = useState("Current Location");
  const [weather, setWeather] = useState(null);
  console.log(weather);
  // console.table(cities);

  useEffect(() => {
    const location =
      selectedLocation === "Current Location"
        ? `lat=${latitude}&lon=${longitude}`
        : `q=${selectedLocation}`;
    const option = {
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`,
    };

    latitude &&
      longitude &&
      axios(option)
        .then((res) => {
          setWeather(res.data);
        })
        .catch((err) => console.log(err));
  }, [selectedLocation, latitude, longitude]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  if (!weather) {
    return <div>Loading...</div>;
  } else if (error) {
    return <p>Error: {error}</p>;
  } else if (latitude === null || longitude === null) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <WeatherInfoContainer>
        <WeatherDescContainer>
          <WeatherIcon
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={`${weather.weather[0].main} Weather Icon`}
          />
          <WeatherDescSpan>
            {WeatherDescKo[`${weather.weather[0].id}`]}
          </WeatherDescSpan>
        </WeatherDescContainer>
        <InfoUl>
          <SelectLi>
            <MapPinImg src={mapPinIcon} alt="맵 핀 아이콘" />
            <Select onChange={handleLocationChange} value={selectedLocation}>
              <option value="Current Location">현재 위치</option>
              {cities.map((city) => (
                <option key={Object.keys(city)} value={Object.values(city)}>
                  {Object.keys(city)}
                </option>
              ))}
            </Select>
          </SelectLi>
          {/* <p>
            Location: {weather.name}, {weather.sys.country}
          </p> */}
          <TempLi>{(weather.main.temp - 273.15).toFixed(1)}°C</TempLi>
          <HumidityAndWindContainer>
            <li>습도: {weather.main.humidity}%</li>
            <li>바람: {weather.wind.speed}m/s</li>
          </HumidityAndWindContainer>
        </InfoUl>
      </WeatherInfoContainer>
    </Container>
  );
};

export default Weather;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const WeatherDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeatherIcon = styled.img`
  width: 16rem;
  height: 16rem;
`;

const WeatherDescSpan = styled.span`
  transform: translateY(-2.8rem);
  font-size: var(--fs-xs);
  text-align: center;
  color: #333;
  font-weight: 700;
  white-space: nowrap;
`;

const InfoUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SelectLi = styled.li`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

const MapPinImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;

const Select = styled.select`
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  height: 2.4rem;
  background-color: #f3f4f6;
  border-radius: 0.2rem;
  /* font-size: var(--fs-xs); */
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }

  & > option {
    background-color: #f3f4f6;
    color: #333;

    &:checked {
      background-color: #e0e0e0;
    }
  }
`;

const TempLi = styled.li`
  font-size: var(--fs-4xl);
  font-weight: 700;
`;

const HumidityAndWindContainer = styled.ul`
  display: flex;
  gap: 0.4rem;
  margin-top: 1rem;
  font-size: var(--fs-xs);
  white-space: nowrap;
`;
