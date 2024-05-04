import { Button } from "@chakra-ui/react"
import EscrowContract from "../abi/EscrowContract.json"
import ERC20Contract from "../abi/StableCoin.json";
import { useSimulateContract, useWriteContract } from "wagmi"
import { ethers } from "ethers"
import { useState } from "react";

interface Props {
    address: string
}

export const EscrowSettle = ({address}: Props) => {
    const [amount, setAmount] = useState(0);
    const {data} = useSimulateContract({
        address: (address as `0x${string}`) || "",
        abi: EscrowContract.abi,
        functionName: "settle",
        args: [],
    })

    const {data: data2} = useSimulateContract({
        address: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`) || "",
        abi: ERC20Contract.abi,
        functionName: "approve",
        args: [address, ethers.utils.parseUnits("100", 18)],
    })

    const { writeContract } = useWriteContract();
    const {writeContract: handleApprove} = useWriteContract();

    const settle = async() => {
        try {
            console.log("Transfer Token");
            if (!window.ethereum) {
              alert("Connect your wallet");
              return;
            }
      
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
      
            const escrow = new ethers.Contract(
              address,
              EscrowContract.abi,
              signer
            );
      
            const contractAddress = new ethers.Contract(address, EscrowContract.abi, signer);
      
            const approveTx = await contractAddress.settle(
            );
      
            const resApproveTx = await approveTx.wait();
            console.log(resApproveTx);
          } catch (e) {
            console.error("Error settle tokens:", e);
            alert(e);
          }
    }

    const handleClick = () => {
        console.log(address);
        handleApprove({
            address: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`) || "",
            abi: ERC20Contract.abi,
            functionName: "approve",
            args: [address, ethers.utils.parseUnits("100", 18)],
        })
        settle();
    }

    return (
        <div>
            <Button onClick={handleClick}>
                Settle
            </Button>
        </div>
    )
}