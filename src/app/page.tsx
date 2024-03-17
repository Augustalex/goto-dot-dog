import { Shantell_Sans } from "next/font/google";
import Image from "next/image";
import { NearMeServer } from "./near-me/NearMeServer";

const headerFont = Shantell_Sans({ subsets: ["latin"], display: "swap" });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 max-w-[512px] mx-auto relative">
      <div className="w-full flex flex-col items-center justify-center">
        <Image
          src="/goto.png"
          alt="Goto dog logo"
          width={240}
          height={240}
          className="mb-[-16px]"
        />
        <h2 className="mb-8 text-[#f0b482] w-64 mt-[-48px] right-[10px] relative scale-[1.5]">
          <span className={headerFont.className}>
            <svg
              viewBox="0 0 400 150"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                id="SunCatcherStudio"
                fill="none"
                stroke="none"
                d="m 31.233725,31.233725 c 0,0 61.574343,63.73891 168.766275,63.73891 121.84084,0 168.76627,-63.73891 168.76627,-63.73891"
              ></path>
              <text fontSize="24.5" fill="#f0b482" fontWeight="bold">
                <textPath xlinkHref="#SunCatcherStudio" startOffset="5">
                  Dog&nbsp;friendly&nbsp;places&nbsp;near&nbsp;you
                </textPath>
              </text>
            </svg>
          </span>
        </h2>
        <NearMeServer />
      </div>
    </main>
  );
}
