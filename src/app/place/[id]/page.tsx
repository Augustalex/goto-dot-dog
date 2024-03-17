import { prisma } from "@/app/db/client";
import { HomeIcon } from "@/misc/HomeIcon";
import { Heading } from "./Heading";
import { MapAction } from "./MapAction";
import { ReviewAction } from "./ReviewAction";
import { UserRating } from "./UserRating";

// NextJS server component that takes the parameter ID from the url
export default async function PlacePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const place = await prisma.place.findFirstOrThrow({
    where: {
      id: id,
    },
  });

  return (
    <div className="max-w-[512px] mx-auto">
      <div className="px-4 pb-4 flex flex-col items-center">
        <HomeIcon width={96} height={96} />
        <Heading place={place} />
        <UserRating />
        <div className="h-[320px] w-full" />
      </div>
      <div className="max-w-[512px] mx-auto fixed bottom-0 w-full bg-gray-50 gray-200 border-t-2 border-black px-4 pb-4 pt-4">
        <MapAction
          latitude={place.latitude}
          longitude={place.longitude}
          mapLink={place.mapLink}
        />
        <ReviewAction placeId={place.id} />
      </div>
    </div>
  );
}
