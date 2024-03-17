"use client";

import { useEffect, useState } from "react";
import { getRandomWeightedDescriptionList } from "./rate/descriptions";

export function UserRating() {
  const [tags, setTags] = useState<{ description: string; votes: number }[]>(
    []
  );

  useEffect(() => {
    setTags(getRandomWeightedDescriptionList());
  }, []);

  return (
    <div className="mt-4 flex flex-col items-center w-full">
      <span className="text-md">What other dog owners say:</span>
      <div className="mt-2">
        {tags.map((tag) => (
          <span key={tag.description} className="text-xl">
            <Chip dark={true} active={false}>
              {`${tag.description} (${tag.votes})`}
            </Chip>
          </span>
        ))}
      </div>
    </div>
  );
}

function Chip({
  active = false,
  dark,
  children,
}: {
  active?: boolean;
  dark: boolean;
  children: string;
}) {
  return (
    <button
      className={`rounded-full text-sm mr-2 mb-3 px-2 py-2 border-2 border-[#f0b482] ${!active ? "fall" : ""} ${active ? (dark ? "bg-black text-white border-black" : "bg-[#f0b482] text-white") : "text-black bg-white border-black"}`}
    >
      {children.toLowerCase()}
    </button>
  );
}
