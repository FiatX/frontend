"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Image } from "@chakra-ui/react";
import Logo from "../components/logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IDKitWidget, VerificationLevel, ISuccessResult } from "@worldcoin/idkit";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, type BaseError, useReadContract } from 'wagmi'
import { decodeAbiParameters, parseAbiParameters } from 'viem'
import RegistryHuman from "../abi/RegistryHuman.json";
// import "../fonts/Nunito.ttf";

export default function Home() {
  const router = useRouter();
  const [done, setDone] = useState(false)
  const onSuccess = (proof: any) => {
    const { data: balance } = useReadContract({
      // ...wagmiContractConfig,
      functionName: "balanceOf",
      args: [walletAddress],
    });
  };

  const { address: walletAddress, isConnecting, isDisconnected } = useAccount();
  const {writeContract, writeContractAsync} = useWriteContract();

  const verifyProof = async (proof: ISuccessResult) => {
    try {
			await writeContractAsync({
				address: process.env.NEXT_PUBLIC_REGISTRY_HUMAN_ADDRESS as `0x${string}`,
				account: walletAddress!,
				abi: RegistryHuman,
				functionName: 'verifyAndExecute',
				args: [
					walletAddress!,
					BigInt(proof!.merkle_root),
					BigInt(proof!.nullifier_hash),
					decodeAbiParameters(
						parseAbiParameters('uint256[8]'),
						proof!.proof as `0x${string}`
					)[0],
				],
			})
			setDone(true)
		} catch (error) {
      console.log(error);
      throw new Error((error as BaseError).shortMessage)
    }
	}

  return (
    <div className=" bg-[url('/nounsbg.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat flex-col flex justify-center items-center text-center gap-5">
      <Image src="/fxnamelogo.png" alt="fxlogo" />
      <div className="font-extrabold text-xl">
        Onchain. Decentralized. Unstoppable
      </div>
      <ConnectButton />
      <IDKitWidget
          app_id="app_3e931b172690e62db948b2f4b838d4d3"
          action="verify"
          // On-chain only accepts Orb verifications
          verification_level={VerificationLevel.Orb}
          signal={walletAddress}
          handleVerify={verifyProof}
          onSuccess={onSuccess}>
          {({ open }) => (
            <button
              onClick={open}
            >
              Verify with World ID
            </button>
        )}
      </IDKitWidget>
      <Button onClick={() => router.replace(`/dashboard`)}>
        Sign in with Worldcoin
      </Button>
    </div>
  );
}
