"use client";
import { Button, Divider } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation";

function TopBar() {
  const router = useRouter();
  return (
    <div className="h-20 bg-slate-200 flex flex-row justify-between p-5">
      <div className="text-3xl">Merchant Dashboard</div>
      <div className="space-x-3">
        <Button colorScheme="red" onClick={() => router.replace(`/dashboard`)}>
          Back to Dashboard
        </Button>
        <Button>M</Button>
        <Button onClick={() => router.replace(`/merchant/config`)}>
          profile
        </Button>
      </div>
    </div>
  );
}

const ActiveAds = ({ price, limit }: { price: string; limit: string }) => (
  <div className="flex justify-between bg-green-400 p-4 rounded-md w-[90%]">
    <div className="flex flex-col text-xl">
      <div>{price}</div>
      <div>Transaction Limit {limit}</div>
    </div>
    <div className="flex items-end flex-col">
      <Button className="underline">Buy Crypto</Button>
      <div className="flex-row">
        <Button>Modify</Button>
        <Button bgColor={"red"}>Take Down</Button>
      </div>
    </div>
  </div>
);

export default function page() {
  const router = useRouter();
  return (
    <div>
      <TopBar />
      {/* {IF IN PROGRESS } */}
      <div className="pl-[5%] pt-5">
        <>Active Ads</>
      </div>
      <div className="flex items-start pt-5 mt-5 justify-center bg-slate-500 min-h-[500px] rounded-lg mx-5">
        <ActiveAds price="100" limit="1000" />
      </div>
      <div className="flex justify-center items-center">
        <Button onClick={() => router.replace(`/`)}>Create new ad </Button>
      </div>
    </div>
  );
}
