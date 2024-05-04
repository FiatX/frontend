import { useContractReads, useReadContract, useReadContracts } from "wagmi"
import RegistryContract from "../abi/RegistryMerchants.json";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";

interface OffersData {
    id: number,
    user: string,
    amount: string,
    symbol: string,
    fiatAmount: string,
    on_ramp: boolean
}


export const GetAllPostOffer = () => {
    const [offers,setOffers] = useState<OffersData>();

    const getOffers = async() => {
        try {
            console.log("Transfer Token");
            if (!window.ethereum) {
              alert("Connect your wallet");
              return;
            }
      
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
      
            const registry = new ethers.Contract(
            process.env.NEXT_PUBLIC_REGISTRY_ADDRESS || "",
            RegistryContract.abi,
              signer
            );

            const length = await registry.getLengthOfOffer();
            let offerTemp = []
            
            for(let i = 0; i < Number(length.toString()); i++){
                const result = await registry.offers(i);
                console.log({
                    id: result[0].toNumber(),
                    user: result[1],
                    amount: result[2].toString(),
                    symbol: result[3],
                    fiatAmount: result[4].toString(),
                    on_ramp: result[5]
                })
                offerTemp.push({
                    id: result[0].toNumber(),
                    user: result[1],
                    amount: result[2].toString(),
                    symbol: result[3],
                    fiatAmount: result[4].toString(),
                    on_ramp: result[5]
                })
            }
          } catch (e) {
            console.error("Error:", e);
            alert(e);
          }
    }

    // const {data: data2, refetch: refetch2} = useReadContract({
    //     address: (process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`) || "",
    //     abi: RegistryContract.abi,
    //     functionName: "offers",
    //     args: [id],
    // })

    // useEffect(()=> {
    //     console.log("useEffect nya called")
    //     if(data2){
    //         console.log();
    //         console.log(data2);
    //     }
    // }, [data2])

    return {getOffers}
}