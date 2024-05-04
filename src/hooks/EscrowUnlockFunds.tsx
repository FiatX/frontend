import { Button } from "@chakra-ui/react"
import EscrowContract from "../abi/EscrowContract.json"
import ERC20Contract from "../abi/StableCoin.json";
import { useSimulateContract, useWriteContract } from "wagmi"
import { ethers } from "ethers"
import { useState } from "react";

interface Props {
    address: string
}

export const EscrowUnlockFunds = ({address}: Props) => {
    const [amount, setAmount] = useState(0);
    const {data} = useSimulateContract({
        address: (address as `0x${string}`) || "",
        abi: EscrowContract.abi,
        functionName: "unlock_funds",
        args: [],
    })

    // const {data: data2} = useSimulateContract({
    //     address: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`) || "",
    //     abi: ERC20Contract.abi,
    //     functionName: "approve",
    //     args: [address, ethers.utils.parseUnits("100", 18)],
    // })

    const { writeContract } = useWriteContract();
    // const {writeContract: handleApprove} = useWriteContract();

    const handleClick = () => {
        console.log(address);
        // handleApprove({
        //     address: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`) || "",
        //     abi: ERC20Contract.abi,
        //     functionName: "approve",
        //     args: [address, ethers.utils.parseUnits("100", 18)],
        // })
        writeContract({
            address: (address as `0x${string}`) || "",
            abi: EscrowContract.abi,
            functionName: "settle",
            args: [],
        },{
            onSuccess() {
                console.log("Success");
              },
              onError(error) {
                console.log(error);
              },
        }
        )
    }

    return (
        <div>
            <Button onClick={handleClick}>
                Unlock Funds
            </Button>
        </div>
    )
}