import Image from "next/image";
import type { PlaceT } from "../../near-me/types";

export function Heading({ place }: { place: PlaceT }) {
  const score = place.webRating.toFixed(1);
  const {
    displayName,
    servesLunch,
    servesDinner,
    webRating,
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

  const coverImage = place.profilePhotoName
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/${place.profilePhotoName}`
    : null;

  const placeName =
    displayName.length > 24
      ? `${displayName.substring(0, 22)}...`
      : displayName;

  return (
    <>
      <div className="w-full">
        {coverImage && (
          <Image
            className="w-full h-[120px] rounded-xl object-cover"
            src={coverImage}
            alt={displayName}
            width={512}
            height={512}
          />
        )}
      </div>
      <span className="text-4xl font-medium mb-1 mt-1 text-center">
        {placeName}
      </span>
      <div className="flex items-center justify-center w-full">
        {lunchDinnerText && (
          <div>
            <span className="text-gray-500 text-xl">{lunchDinnerText}</span>
          </div>
        )}
        <Score webRating={webRating} webRatingCount={webRatingCount} />
      </div>
    </>
  );
}

function Score({
  webRating,
  webRatingCount,
}: {
  webRating: number;
  webRatingCount: number;
}) {
  const score = webRating.toFixed(1);

  const ratingCountText =
    webRatingCount > 1000
      ? "1000+"
      : webRatingCount > 500
        ? "500+"
        : webRatingCount > 100
          ? "100+"
          : webRatingCount.toString();

  return (
    <div className="relative ml-4 flex items-center justify-center font-medium">
      <Image
        className="mr-1 top-[-1px] relative"
        src="/star.svg"
        alt="star"
        width={20}
        height={20}
      />
      <span className="">{score}</span>
      <span className="ml-2 text-gray-500 text-m relative tracking-wider">
        ({ratingCountText})
      </span>
    </div>
  );
}
