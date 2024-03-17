import Image from "next/image";
import Link from "next/link";

export function DogRating() {
  return (
    <div className="mt-4 flex flex-col items-center w-full">
      <div className="w-full flex flex-col items-center ">
        <div className="mb-[-8px] flex justify-center items-center w-full">
          <Image
            src="/dog_approval.png"
            alt="Dog approval"
            width={128}
            height={128}
            className="m-[-12px] "
          />
          <span className="text-7xl font-bold">80%</span>
        </div>
        <span className="text-2xl font-bold">Dog owners like this place</span>
      </div>
      <div className="mt-6 flex flex-col items-center w-3/4">
        <span>Have you been there?</span>
        <Link
          href="/place/review"
          className="w-full mt-2 rounded-lg bg-black text-white p-4 flex items-center justify-center text-xl font-medium"
        >
          Tell us about your visit
        </Link>
      </div>
      <div className="mt-6 flex flex-col items-center w-3/4">
        <span>Is the information not correct?</span>
        <Link
          href="/place/review"
          className="w-full mt-2 rounded-lg bg-black text-white p-4 flex items-center justify-center text-xl font-medium"
        >
          Report an issue
        </Link>
      </div>
    </div>
  );
}
