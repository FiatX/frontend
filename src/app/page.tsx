"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";
import Logo from "../components/logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "../fonts/Nunito.ttf";
import { IDKitWidget } from "@worldcoin/idkit";
import { useAccount, useReadContract } from "wagmi";

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
    <div className="flex flex-col justify-center items-center h-screen">
      <Logo />
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
