"use client";
import { Button, Divider } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation";
import { Image } from "@chakra-ui/react";
import { useReadContract } from "wagmi";
import { useRegisterMerchant } from "@/hooks/RegisterMerchant";
// import Divider from "@/components/divider";

function TopBar() {
  const router = useRouter();
  return (
    <div className="h-20 bg-slate-400 flex flex-row justify-between p-5">
      <div className="flex flex-row gap-3">
        <Image className="w-[36px] h-[36px]" src="/fxlogo.png" alt="fxlogo" />
        <div className="text-3xl">Merchant Dashboard</div>
      </div>

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

const ActiveAds = ({
  price,
  limit,
  sell = false,
}: {
  price: string;
  limit: string;
  sell?: boolean;
}) => (
  <div
    className={`flex justify-between ${
      sell ? "bg-red-400" : "bg-green-400"
    } p-4 rounded-md w-[90%]`}
  >
    <div className="flex flex-col text-xl">
      <div>{price}</div>
      <div>Transaction Limit {limit}</div>
    </div>
    <div className="flex flex-col gap-2">
      {sell ? (
        <Button className="underline">Sell Crypto</Button>
      ) : (
        <Button className="underline">Buy Crypto</Button>
      )}
      {/* <div className="flex-row"> */}
      <Button>Modify</Button>
      <Button bgColor={"red"}>Take Down</Button>
      {/* </div> */}
    </div>
  </div>
);

const OngoingCards = ({
  price,
  limit,
  id,
  sell = false,
}: {
  price: string;
  limit: string;
  id: string;
  sell?: boolean;
}) => {
  const router = useRouter();
  return (
    <div
      className={`flex justify-between ${
        sell ? "bg-red-400" : "bg-blue-400"
      } p-4 rounded-md w-[90%]`}
    >
      <div className="flex flex-col text-xl">
        <div>{price}</div>
        <div>Transaction Limit {limit}</div>
      </div>
      <div className="flex flex-col gap-2">
        {sell ? (
          <div className="underline">Sell Crypto</div>
        ) : (
          <div className="underline">Buy Crypto</div>
        )}
        <Button
          onClick={() =>
            router.replace(`/${sell ? `onramp` : `offramp`}/${id}/merchant`)
          }
        >
          Go to transaction
        </Button>
      </div>
    </div>
  );
};

export default function Page() {
  const router = useRouter();

  // const { data: balance } = useReadContract({
  //   ...wagmiContractConfig,
  //   functionName: "balanceOf",
  //   args: ["0x03A71968491d55603FFe1b11A9e23eF013f75bCF"],
  // });

  return (
    <div>
      <TopBar />
      <div className="px-[5%] pt-5">
        <div>In Progress: Action Needed</div>
      </div>
      <div className="flex flex-col items-center py-5 my-5 justify-items-start bg-slate-500 rounded-lg mx-5 gap-5">
        <OngoingCards price="100" limit="1000" id="aaaa" sell />
      </div>
      {/* {Data?.map((data) => {
        <div></div>;
      })} */}
      {/* ACTIVE Ads */}
      <Divider />
      <div className="px-[5%] pt-5 flex justify-between">
        <div>Active Ads</div>
        <Button
          colorScheme="twitter"
          onClick={() => router.replace(`/merchant/newAd`)}
        >
          Create new ad
        </Button>
      </div>
      <div className="flex flex-col items-center py-5 my-5 justify-items-start bg-slate-500 rounded-lg mx-5 gap-5">
        <ActiveAds price="100" limit="1000" />
        <ActiveAds price="100" limit="1000" sell />
        <ActiveAds price="100" limit="1000" />
        <ActiveAds price="100" limit="1000" />
      </div>
    </div>
  );
}
