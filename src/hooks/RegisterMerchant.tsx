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
    args: [],
  });


  const { writeContract } = useWriteContract();
  const { writeContract: approveContract } = useWriteContract();

  const handleClick = () => {
    writeContract(
      {
        address:
          (process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`) || "",
        abi: RouterContract.abi,
        functionName: "registerMerchant",
        args: [],
      },
      {
        onSuccess() {
          console.log("Success");
        },
        onError(error) {
          console.log(error);
        },
      }
    );
  };

  return { amount, setAmount, handleClick };
};
