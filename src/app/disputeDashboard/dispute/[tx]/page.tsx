"use client";
import { Button, Image, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const txid = pathname.split("/")[3];
  return (
    <div className="h-20 bg-slate-400 flex flex-row justify-between p-5">
      <div className="flex flex-row gap-3">
        <Image className="w-[36px] h-[36px]" src="/fxlogo.png" alt="fxlogo" />
        <div className="text-3xl">Dispute Tx{txid}</div>
      </div>
      <Button colorScheme="red" onClick={() => router.replace(`/merchant`)}>
        Back to Dashboard
      </Button>
    </div>
  );
}

export default function DisputePage() {
  const pathname = usePathname();
  const txid = pathname.split("/")[3];

  return (
    <div>
      <TopBar />
      <div className="flex justify-center items-center">
        <div className="bg-gray-400 p-3 mt-5 rounded-xl">
          <div>Type: offramp</div>
          <div>Crypto Amount: 50 USDC</div>
          <div>Fiat Amount: IDR 806,000.00</div>
          <div>Exchange Rate: 16,120.00 IDR/USDC</div>
        </div>
      </div>
      <div className="px-[100px]">
        <div className="grid grid-cols-2 justify-center items-center pt-10 gap-5">
          <div className="grid-cols-1 space-y-3">
            <>User: oiewurueriowqepruiqwuerpo</>
            <div>Tell us what happened</div>
            <Input height={100}></Input>
            <div>Submitted evidence</div>
            <Input></Input>
            <Button>Vote User</Button>
          </div>
          <div className="grid-cols-1 space-y-3">
            <>Merchant: oiewurueriowqepruiqwuerpo</>
            <div>Tell us what happened</div>
            <Input height={100}></Input>
            <div>Submitted evidence</div>
            <Input></Input>
            <Button>Vote Merchant</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
