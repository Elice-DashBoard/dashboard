import { useState, useEffect } from "react";

const useGeolocation = () => {
  // console.log(navigator.geolocation);

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  const onSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setLocation({
      latitude,
      longitude,
      error: null,
    });
  };

  const onError = (error) => {
    setLocation({
      latitude: null,
      longitude: null,
      error: error.message,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  }, []);

  return location;
};

export default useGeolocation;
