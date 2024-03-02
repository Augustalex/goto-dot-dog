import { getDistance } from "@/app/features/near-me/getDistance";
import { CoordinatesT, PlaceT } from "@/app/features/near-me/types";

export function sortPlaces(places: PlaceT[], currentLocation: CoordinatesT) {
  return places.slice().sort((placeA, placeB) => {
    const distanceA = getDistance(
      placeA.latitude,
      placeA.longitude,
      currentLocation.latitude,
      currentLocation.longitude
    );
    const distanceB = getDistance(
      placeB.latitude,
      placeB.longitude,
      currentLocation.latitude,
      currentLocation.longitude
    );
    return distanceA - distanceB;
  });
}
