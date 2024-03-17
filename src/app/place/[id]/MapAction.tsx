import Link from "next/link";
import { DistanceCount } from "./DistanceCount";

export function MapAction({
  latitude,
  longitude,
  mapLink,
}: {
  latitude: number;
  longitude: number;
  mapLink: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <DistanceCount
        latitude={latitude}
        longitude={longitude}
        suffix="m away"
      />
      <Link
        href={mapLink}
        className="w-full h-[120px] mt-2 rounded-2xl border-2 border-[#f0b482] text-[#f0b482] p-4 flex items-center justify-center text-2xl font-medium"
      >
        Open in maps
      </Link>
    </div>
  );
}
