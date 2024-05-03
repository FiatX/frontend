import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <Image
        src="next.svg"
        height={100}
        width={100}
        alt="logo"
        className="rounded-full bg-black"
      /> */}
      <div className="rounded-full bg-black h-[150px] w-[150px]">{""}</div>
      <div>Fiat X</div>
      <div>Onchain. Decentralized. Unstoppable</div>
    </div>
  );
}
