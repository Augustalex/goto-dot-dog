"use client";

import { getDistance } from "@/app/near-me/getDistance";
import { useCurrentLocation } from "@/misc/useCurrentLocation";

export function DistanceCount({
  latitude,
  longitude,
  suffix = "m",
}: {
  latitude: number;
  longitude: number;
  suffix?: string;
}) {
  const currentLocation = useCurrentLocation();

  if (!currentLocation) return "...";

  const distanceMeters = getDistance(
    latitude,
    longitude,
    currentLocation.latitude,
    currentLocation.longitude
  );
  return `${distanceMeters}${suffix}`;
}
