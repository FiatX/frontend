import { useState } from "react";
import { useAccount, useSimulateContract, useWriteContract } from "wagmi";
import ERC20Contract from "../abi/StableCoin.json";
import { ethers } from "ethers";

export const useMintERC20 = () => {
    const [amount, setAmount] = useState(0);
    const { address, status } = useAccount();

    const { data } = useSimulateContract({
        address: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`) || "",
        abi: ERC20Contract.abi,
        functionName: "mint",
        args: [address, amount],
    });

    const {writeContract} = useWriteContract();

    const handleMint = () => {
        writeContract({
            address: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`) || "",
            abi: ERC20Contract.abi,
            functionName: "mint",
            args: [address, ethers.utils.parseUnits(amount.toString(), 18)],
        },{
            onSuccess() {
              console.log("Success");
            },
            onError(error) {
            console.log(error)
            },
          })
    }

    return {amount, setAmount, handleMint};
}