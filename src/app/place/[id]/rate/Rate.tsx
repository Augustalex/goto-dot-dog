"use client";

import { explode } from "@/misc/explode";
import type { Place } from "@prisma/client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getRandomDescriptionList } from "./descriptions";

export default function Rate({ place }: { place: Place }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [list, setList] = useState<string[]>([]);
  const scrollContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setList(getRandomDescriptionList());
  }, []);

  return (
    <div
      ref={scrollContainer}
      className="min-h-screen max-w-[512px] mx-auto overflow-x-hidden"
    >
      <div className="flex flex-col px-4 pt-4 items-start mb-[220px]">
        <h1 className="text-2xl">
          {submitted ? "Your rating for:" : "Rate your visit for:"}
        </h1>
        <Link href={`/place/${place.id}`}>
          <h2 className="mb-4 text-4xl font-medium">{place.displayName}</h2>
        </Link>
        <SlidingRater locked={submitted} />
        <div className="mt-8">
          <span>
            {submitted
              ? "This is how you described your visit:"
              : "Select everything that describes your visit"}
          </span>
          <div className="mt-2">
            {list.map((description) => (
              <Chip
                key={description}
                onClick={() => toggleChip(description)}
                active={selectedChips.includes(description)}
                dark={submitted}
              >
                {description}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed max-w-[512px] mx-auto bg-gray-50 bottom-0 flex flex-col w-full">
        {/* <div className="w-full h-[30px] bg-gradient-to-b from-black to-white" /> */}
        <div className="w-full border-t-2 border-black pb-4" />

        <div className="w-full flex justify-center items-center pt-2 pb-6 flex flex-col">
          {submitted ? (
            <>
              <span className="mb-6 px-3 py-1 rounded-full text-black text-sm font-medium">
                Your rating has been recieved!
              </span>
              <Link
                href={`/place/${place.id}`}
                className="px-8 py-4 rounded-full bg-black text-white text-xl font-medium disabled:bg-white disabled:text-black disabled:border-black disabled:border-2 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Take me back
              </Link>
            </>
          ) : (
            <>
              {selectedChips.length === 0 ? (
                <span className="mb-6 px-3 py-1 rounded-full bg-white text-black text-sm font-medium">
                  Select at least one tag
                </span>
              ) : (
                <button
                  onClick={clearTags}
                  className="mb-6 px-3 py-1 rounded-full bg-white text-black border-2 border-black text-sm font-medium"
                >
                  Clear {selectedChips.length} tags
                </button>
              )}
              <button
                onClick={submit}
                className="px-8 py-4 rounded-full bg-black text-white text-xl font-medium disabled:bg-white disabled:text-black disabled:border-black disabled:border-2 disabled:cursor-not-allowed disabled:opacity-30"
                disabled={selectedChips.length === 0}
              >
                Submit rating
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  function submit() {
    setSubmitted(true);
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      explode(".fall");
    }, 500);
  }

  function toggleChip(description: string) {
    if (selectedChips.includes(description)) {
      setSelectedChips(selectedChips.filter((chip) => chip !== description));
    } else {
      setSelectedChips([...selectedChips, description]);
    }
  }

  function clearTags() {
    setSelectedChips([]);
  }
}

function Chip({
  active = false,
  dark,
  onClick,
  children,
}: {
  active?: boolean;
  dark: boolean;
  onClick(): void;
  children: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full text-sm mr-2 mb-3 px-2 py-2 border-2 border-[#f0b482] ${!active ? "fall" : ""} ${active ? (dark ? "bg-black text-white border-black" : "bg-[#f0b482] text-white") : "text-black bg-white border-black"}`}
    >
      {children.toLowerCase()}
    </button>
  );
}

function SlidingRater({ locked }: { locked: boolean }) {
  const [score, setScore] = useState(3);
  const [updatingScore, setUpdatingScore] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("pointerup", () => setUpdatingScore(false));
    return () =>
      window.removeEventListener("pointerup", () => setUpdatingScore(false));
  }, []);

  return (
    <div
      ref={container}
      className={`rounded-full border-2 py-3 px-6 touch-none ${locked ? "pointer-events-none border-black" : "border-[#f0b482]"}`}
    >
      <div onPointerMove={onPointerMove} onPointerDown={onPointerDown}>
        <PawIcon active={score >= 1} color={locked ? "black" : "#f0b482"} />
        <PawIcon active={score >= 2} color={locked ? "black" : "#f0b482"} />
        <PawIcon active={score >= 3} color={locked ? "black" : "#f0b482"} />
        <PawIcon active={score >= 4} color={locked ? "black" : "#f0b482"} />
        <PawIcon active={score >= 5} color={locked ? "black" : "#f0b482"} />
      </div>
    </div>
  );

  function onPointerDown() {
    setUpdatingScore(true);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!container.current) return;
    if (!updatingScore) return;

    const { clientX, target } = event;
    const { left, width } = (target as HTMLDivElement).getBoundingClientRect();

    const x = clientX - left;
    const percentage = x / width;
    const newScore = Math.min(Math.max(Math.floor(percentage * 5) + 1, 1), 5);
    setScore(newScore);
  }
}

function PawIcon({
  active = false,
  color,
}: {
  active?: boolean;
  color: string;
}) {
  const activeClassName = active ? "" : "opacity-40";
  return (
    <div
      className={`inline-flex m-2 w-[42px] h-[42px] pointer-events-none ${activeClassName}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill={color}
      >
        <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5.3-86.2 32.6-96.8 70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3-14.4-70.1 10.1-84.1 59.7.9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2a87.7 87.7 0 0 1 5.2 30.5v1.6a46.7 46.7 0 0 1-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22a96.7 96.7 0 0 0-46.6 0l-88 22a138.9 138.9 0 0 1-34 4.2A46.7 46.7 0 0 1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zm352.6-118.5c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3 29.1 51.7 10.2 84.1-54 47.3-78.5 33.3zm-111.7-93c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5 46.9 53.9 32.6 96.8-52.1 69.1-84.4 58.5z" />
      </svg>
    </div>
  );
}
