import Image from "next/image";
import Link from "next/link";

export function HomeIcon({
  width,
  height,
  className = "",
}: {
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div className="w-full flex">
      <Link href="/" className="flex items-center">
        <BackIcon />
        {/* <span className="text-[#f0b482] fill-[#f0b482]">Go back</span> */}
      </Link>
      <Link href="/">
        <Image
          src="/goto.png"
          alt="Goto dog logo"
          className={className}
          width={width}
          height={height}
        />
      </Link>
    </div>
  );
}

function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="32"
      width="32"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className="text-[#f0b482] fill-[#f0b482]"
    >
      <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
    </svg>
  );
}
