"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Image } from "@chakra-ui/react";
import Logo from "../components/logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IDKitWidget } from "@worldcoin/idkit";
import { useAccount, useReadContract } from "wagmi";
// import "../fonts/Nunito.ttf";

export default function Home() {
  const router = useRouter();
  const onSuccess = (proof: any) => {
    const { data: balance } = useReadContract({
      // ...wagmiContractConfig,
      functionName: "balanceOf",
      args: [walletAddress],
    });
  };

  const { address: walletAddress, isConnecting, isDisconnected } = useAccount();

  return (
    <div className=" bg-[url('/nounsbg.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat flex-col flex justify-center items-center text-center gap-5">
      <Image src="/fxnamelogo.png" alt="fxlogo" />
      <div className="font-extrabold text-xl">
        Onchain. Decentralized. Unstoppable
      </div>
      <ConnectButton />
      <IDKitWidget
        app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT" // must be an app set to on-chain in Developer Portal
        action="verify"
        signal={walletAddress} // proof will only verify if the signal is unchanged, this prevents tampering
        onSuccess={onSuccess} // use onSuccess to call your smart contract
      >
        {({ open }) => <Button onClick={open}>Verify with World ID</Button>}
      </IDKitWidget>
      <Button onClick={() => router.replace(`/dashboard`)}>
        Sign in with Worldcoin
      </Button>
    </div>
  );
}
