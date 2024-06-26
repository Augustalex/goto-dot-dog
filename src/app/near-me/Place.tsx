import { useFeature } from "@/app/features/features";
import { getDistance } from "@/app/near-me/getDistance";
import { PlaceT } from "@/app/near-me/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Place({
  place,
  currentLocation,
}: {
  place: PlaceT;
  currentLocation: { latitude: number; longitude: number };
}) {
  const placeCommunityFeature = useFeature("place-community");
  const router = useRouter();
  const score = place.webRating.toFixed(1);
  const {
    displayName,
    servesLunch,
    servesDinner,
    webRatingCount,
    latitude,
    longitude,
    mapLink,
  } = place;

  const lunchDinnerText =
    servesLunch && servesDinner
      ? "Lunch & dinner"
      : !servesLunch && servesDinner
        ? "Only dinner"
        : servesLunch && !servesDinner
          ? "Only lunch"
          : null;

  const distanceMeters = getDistance(
    latitude,
    longitude,
    currentLocation.latitude,
    currentLocation.longitude
  );

  const coverImage = place.profilePhotoName
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/${place.profilePhotoName}`
    : null;

  const placeName =
    displayName.length > 24
      ? `${displayName.substring(0, 22)}...`
      : displayName;

  const ratingCountText =
    webRatingCount > 1000
      ? "1000+"
      : webRatingCount > 500
        ? "500+"
        : webRatingCount > 100
          ? "100+"
          : webRatingCount.toString();

  return (
    <li
      className="mb-5 flex flex-col justify-start items-stretch w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full mb-2 hover:opacity-75">
        {coverImage && (
          <Image
            className="w-full h-[180px] rounded-2xl object-cover"
            src={coverImage}
            alt={displayName}
            width={512}
            height={512}
          />
        )}
      </div>
      <div className="flex items-stretch max-w-full w-full">
        <div className="flex flex-col items-stretch w-full">
          <div className="flex items-center justify-between w-full">
            <span className="text-md font-medium truncate">{placeName}</span>
            <div className="relative ml-2 mr-auto flex items-center justify-center font-medium">
              <Image
                className="mr-0.5 top-[-1px] relative"
                src="/star.svg"
                alt="star"
                width={18}
                height={18}
              />
              <span>{score}</span>
              <span className="ml-1.5 opacity-50 text-xs top-[-0px] relative tracking-wider">
                ({ratingCountText})
              </span>
            </div>
            <span className="pl-3 text-md font-medium">{distanceMeters}m</span>
          </div>
          {lunchDinnerText && (
            <div>
              <span className="opacity-65 text-sm">{lunchDinnerText}</span>
            </div>
          )}
        </div>
      </div>
    </li>
  );

  function onClick() {
    if (placeCommunityFeature === "on") {
      router.push(`/place/${place.id}`);
    } else {
      window.location.assign(mapLink);
    }
  }
}
