import { useContractReads, useReadContract, useReadContracts } from "wagmi"
import RegistryContract from "../abi/RegistryMerchants.json";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

interface OffersData {
    id: string,
    user: string,
    amount: string,
    symbol: string,
    fiatAmount: string,
    on_ramp: boolean
}


export const GetAllPostOffer = (id: number) => {
    const [offers,setOffers] = useState<OffersData>();

    const {data: data2, refetch: refetch2} = useReadContract({
        address: (process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`) || "",
        abi: RegistryContract.abi,
        functionName: "offers",
        args: [id],
    })

    useEffect(()=> {
        console.log("useEffect nya called")
        if(data2){
            console.log();
            console.log(data2);
        }
    }, [data2])

    return {data2}
}