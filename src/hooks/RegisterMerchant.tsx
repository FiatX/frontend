import { useState } from "react";
import { useSimulateContract, useWriteContract } from "wagmi";
import RouterContract from "../abi/RouterContract.json";
import ERC20Contract from "../abi/StableCoin.json";
import { ethers } from "ethers";

export const useRegisterMerchant = () => {
    const [amount, setAmount] = useState(0);

    const { data } = useSimulateContract({
        address: (process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`) || "",
        abi: RouterContract.abi,
        functionName: "registerMerchant",
        args: [ethers.utils.parseUnits(amount.toString(), 18)],
    });

    const {data: data2} = useSimulateContract({
        address: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`) || "",
        abi: ERC20Contract.abi,
        functionName: "approve",
        args: [(process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`) || "", ethers.utils.parseUnits(amount.toString(), 18)],
    })

    const { writeContract } = useWriteContract();
    const {writeContract: approveContract } = useWriteContract();

    const handleClick = () => {
        approveContract({
            address: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`) || "",
            abi: ERC20Contract.abi,
            functionName: "approve",
            args: [(process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`) || "", ethers.utils.parseUnits(amount.toString(), 18)],
        },{
            onSuccess() {
              console.log("Success");
            },
            onError(error) {
            console.log(error)
            },
          }
        )
        writeContract({
            address: (process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`) || "",
            abi: RouterContract.abi,
            functionName: "registerMerchant",
            args: [ethers.utils.parseUnits(amount.toString(), 18)],
        },{
            onSuccess() {
              console.log("Success");
            },
            onError(error) {
            console.log(error)
            },
          });
    };

    return { amount, setAmount, handleClick };
};
