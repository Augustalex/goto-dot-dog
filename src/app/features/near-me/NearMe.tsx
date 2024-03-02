"use client";

import { Place } from "@/app/features/near-me/Place";
import { sortPlaces } from "@/app/features/near-me/sortPlaces";
import { CoordinatesT, PlaceT } from "@/app/features/near-me/types";
import { useEffect, useState } from "react";

export function NearMe({ places }: { places: PlaceT[] }) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  useShowMore({ ref, showMore });
  const [currentLocation, setCurrentLocation] = useState<CoordinatesT | null>(
    null
  );
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setCurrentLocation(currentLocation);
    });
  }, []);

  if (!currentLocation) return null;

  const sortedPlaces = sortPlaces(places, currentLocation);
  const visiblePlaces = sortedPlaces.slice(0, limit);
  const hasReachedEnd = limit >= sortedPlaces.length;

  return (
    <>
      <ul className="w-full flex flex-col">
        {visiblePlaces.map((p) => {
          return (
            <Place key={p.id} place={p} currentLocation={currentLocation} />
          );
        })}
      </ul>
      {hasReachedEnd ? (
        <></>
      ) : (
        <div ref={setRef} onClick={showMore}>
          <SvgLoadingSpinnerWithRotatingAnimation />
        </div>
      )}
    </>
  );

  function showMore() {
    setLimit(limit + 10);
  }
}

function useShowMore({
  ref,
  showMore,
}: {
  ref: HTMLDivElement | null;
  showMore: () => void;
}) {
  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) showMore();
    });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, showMore]);
}

function SvgLoadingSpinnerWithRotatingAnimation() {
  return (
    <svg
      className="animate-spin h-[32px] w-[32px] text-[#f0b482]"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        d="M12 2a10 10 0 00-10 10 10 10 0 007.775 9.743M22 12a10 10 0 00-10-10V2"
        stroke="currentColor"
        strokeWidth="4"
      ></path>
    </svg>
  );
}
