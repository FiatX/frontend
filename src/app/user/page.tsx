"use client";
import Divider from "@/components/divider";
import { Divider as ChakraDivider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

function TopBar() {
  const router = useRouter();
  return (
    <div className="h-20 bg-slate-200 flex flex-row justify-between p-5">
      <div className="text-3xl">P2P Dashboard</div>
      <div>
        <Button colorScheme="red" onClick={() => router.replace(`/dashboard`)}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
const OnRamp = ({ price, limit }: { price: string; limit: string }) => {
  return (
    <div className="flex justify-between bg-green-400 p-4 rounded-md w-[90%]">
      <div className="flex flex-col text-xl">
        <div>AUD {price}</div>
        <div>Transaction Limit {limit}</div>
      </div>
      <div className="flex items-center justify-center">
        {/* ONCLICK OPEN MODAL */}
        <Button>Details</Button>
      </div>
    </div>
  );
};

const OffRamp = ({ price, limit }: { price: string; limit: string }) => {
  return (
    <div className="flex justify-between bg-blue-400 p-4 rounded-md w-[90%]">
      <div className="flex flex-col text-xl">
        <div>AUD {price}</div>
        <div>Transaction Limit {limit}</div>
      </div>
      <div className="flex items-center justify-center">
        <Button>Details</Button>
      </div>
    </div>
  );
};

const DetailModal = () => {};

export default function page() {
  return (
    <div>
      <TopBar />
      <Divider />

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="col-span-1 justify-center items-center flex flex-col">
          <div className="pb-5">On Ramp</div>
          <OnRamp price={"100"} limit={"22"} />
        </div>

        <div className="col-span-1 items-center flex flex-col">
          <div className="pb-5">Off Ramp</div>
          <OffRamp price={"100"} limit={"22"} />
        </div>
      </div>
    </div>
  );
}
