import Link from "next/link";

export function CommentAction({ placeId }: { placeId: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Link
        href={`/place/${placeId}/comment`}
        className="w-full h-[60px] mt-2 rounded-xl bg-[#f0b482] text-white p-4 flex items-center justify-center text-2xl font-medium"
      >
        <PawIcon active color="white" />
        Comment
      </Link>
    </div>
  );
}

export function InlineCommentAction({ placeId }: { placeId: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Link
        href={`/place/${placeId}/comment`}
        className="w-full h-[60px] mt-2 rounded-xl border-2 border-[#f0b482] text-[#f0b482] p-4 flex items-center justify-center text-2xl font-medium "
      >
        Leave a comment!
      </Link>
    </div>
  );
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
