import { useEffect, useState } from "react";
import type { CoordinatesT } from "../app/near-me/types";

export function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState<CoordinatesT | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setCurrentLocation(currentLocation);
    });
  }, []);

  return currentLocation;
}
