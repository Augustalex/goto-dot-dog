"use client";

import type { Visit } from "@prisma/client";
import Image from "next/image";
import { InlineCommentAction } from "./CommentAction";

export function UserComments({
  placeId,
  visits,
}: {
  placeId: string;
  visits: Visit[];
}) {
  if (visits.length === 0) {
    return (
      <div className="mt-[36px] flex flex-col items-center w-full">
        <span className="text-md font-semibold">
          Have you and your dog been here?
        </span>
        <InlineCommentAction placeId={placeId} />
      </div>
    );
  }

  return (
    <div className="mt-[36px] flex flex-col items-center w-full">
      <span className="text-md font-semibold">Comments</span>

      <div className="mt-2 w-full">
        {visits.map((visit) => (
          <UserComment key={visit.id} visit={visit} />
        ))}
      </div>
    </div>
  );
}

function UserComment({ visit }: { visit: Visit }) {
  const imageClassName = "rounded-full w-10 h-10 object-cover";

  return (
    <div className="w-full border-2 rounded-md border-grey-100 px-3 pt-3 pb-5">
      <div className="flex items-center w-full">
        {visit.authorProfileUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={visit.authorProfileUrl}
            width={40}
            height={40}
            alt={"User profile image"}
            className={imageClassName}
          />
        ) : (
          <Image
            src="/dog.svg"
            width={40}
            height={40}
            alt={"User profile image"}
            className={imageClassName}
          />
        )}
        <span className="font-semibold ml-2">
          {visit.authorDisplayName || visit.authorEmail || "Dog owner"}
        </span>
      </div>
      <div className="mt-2 flex items-center w-full">
        <ScoreStars score={3} />
        <span className="ml-2 mr-2 text-gray-500">•</span>
        <div className="text-gray-500">{visit.createdAt.toDateString()}</div>
      </div>
      <p className="mt-1">{visit.comment}</p>
    </div>
  );
}

// function Score({ score }: { score: number }) {
//   return (
//     <div className="flex items-center justify-center font-medium">
//       <Image
//         className="mr-1 top-[-1px] relative"
//         src="/star.svg"
//         alt="star"
//         width={20}
//         height={20}
//       />
//       <span className="">{score}/5</span>
//     </div>
//   );
// }

function ScoreStars({ score }: { score: number }) {
  return (
    <div className="flex items-center justify-center font-medium gap-1">
      {[...Array(score)].map((_, i) => (
        <Image
          key={i}
          className="top-[-1px] relative"
          src="/star.svg"
          alt="star"
          width={20}
          height={20}
        />
      ))}
      {[...Array(5 - score)].map((_, i) => (
        <Image
          key={i}
          className="top-[-1px] relative opacity-40"
          src="/star.svg"
          alt="star"
          width={20}
          height={20}
        />
      ))}
    </div>
  );
}
