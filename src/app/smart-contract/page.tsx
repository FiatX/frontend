"use client";
import { useRegisterMerchant } from "../../hooks/RegisterMerchant";
import { GetAllPostOffer } from "@/hooks/GetAllPostOffer";
import { usePostOfferOnRamp } from "@/hooks/PostOfferOnRamp";
import { OnRamp } from "@/hooks/OnRamp";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import RegistryContract from "../../abi/RegistryMerchants.json";
import { useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { EscrowSettle } from "@/hooks/EscrowSettle";

export default function SmartContract() {
    const [offer, setOffer] = useState([]);

    const { amount, setAmount, handleClick } = useRegisterMerchant();
    const {amount: amount2, setAmount: setAmount2, symbol, setSymbol, fiatAmount, setFiatAmount, handleClick: handlePostOffer} = usePostOfferOnRamp();
    // const {data, refetch} = useReadContract({
    //     address: (process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`) || "",
    //     abi: RegistryContract.abi,
    //     functionName: "getLengthOfOffer",
    //     args: [],
    // })
    // useEffect(()=>{
    //     if(data){
    //         let index = Number(data.toString());
    //         let offerTemp: any = [];
    //         for(let i = 0; i < index; i++){
    //             const {data2} = GetAllPostOffer(i);
    //             offerTemp.push(data2);
    //         }
    //         setOffer(offerTemp);
    //     }
    // },[data])
    return (
        <div>
            <h1>Smart Contract Page</h1>
            <h2>Amount</h2>
            <div>
                <button onClick={handleClick}>
                    Register
                </button>
            </div>
            <div>
               <Button onClick={()=>{
                setAmount2(100);
                setSymbol("RP");
                setFiatAmount(16000);
                handlePostOffer();
               }}>
                Register Post
               </Button>
            </div>
            <div>
                <OnRamp />
            </div>
            <div>
                <EscrowSettle address="0xb01d20A679d64Db888f5AFAD35dB589a2Fb8368d" />
            </div>
        </div>
    );
}
