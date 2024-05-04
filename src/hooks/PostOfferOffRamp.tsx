import { useSimulateContract, useWriteContract } from "wagmi";
import RouterContract from "../abi/RouterContract.json";
import { useState } from "react";
import { ethers } from "ethers";

export const usePostOfferOffRamp = () => {
    const [amount, setAmount] = useState(0);
    const [symbol, setSymbol] = useState("");
    const [fiatAmount, setFiatAmount] = useState(0);
    
    const {data} = useSimulateContract({
        address: (process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`) || "",
        abi: RouterContract.abi,
        functionName: "postOffer",
        args: [ethers.utils.parseUnits(amount.toString(), 18), false, symbol, fiatAmount],
    })

  const { writeContract } = useWriteContract();

  const handleClick = () => {
    writeContract(
      {
        address:
          (process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`) || "",
        abi: RouterContract.abi,
        functionName: "postOffer",
        args: [
          ethers.utils.parseUnits(amount.toString(), 18),
          true,
          symbol,
          fiatAmount,
        ],
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

  return {
    amount,
    setAmount,
    symbol,
    setSymbol,
    fiatAmount,
    setFiatAmount,
    handleClick,
  };
};
