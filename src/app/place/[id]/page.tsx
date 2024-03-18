import { prisma } from "@/app/db/client";
import { HomeIcon } from "@/misc/HomeIcon";
import { CommentAction } from "./CommentAction";
import { Heading } from "./Heading";
import { MapAction } from "./MapAction";
import { UserComments } from "./UserComments";

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
  const visits = await prisma.visit.findMany({ where: { placeId: id } });

  return (
    <div className="max-w-[512px] mx-auto">
      <div className="px-4 pb-4 flex flex-col items-center">
        <HomeIcon width={80} height={80} />
        <Heading place={place} />
        {/* <UserRating /> */}
        <UserComments visits={visits} placeId={id} />
        <div className="h-[320px] w-full" />
      </div>
      <div className="max-w-[512px] mx-auto fixed bottom-0 w-full bg-gray-50 gray-200 border-t-2 border-black px-4 pb-4 pt-4">
        <MapAction
          latitude={place.latitude}
          longitude={place.longitude}
          mapLink={place.mapLink}
        />
        {/* <ReviewAction placeId={place.id} /> */}
        <CommentAction placeId={place.id} />
      </div>
    </div>
  );
}
