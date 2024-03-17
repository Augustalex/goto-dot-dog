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
    <Link href="/">
      <Image
        src="/goto.png"
        alt="Goto dog logo"
        className={className}
        width={width}
        height={height}
      />
    </Link>
  );
}
