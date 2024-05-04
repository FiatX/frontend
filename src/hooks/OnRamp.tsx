import { useAccount, useReadContract, useSimulateContract, useWatchContractEvent, useWriteContract } from "wagmi"
import RouterContract from "../abi/RouterContract.json";
import GovernanceContract from "../abi/GovernanceDispute.json";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

export const OnRamp = () => {
    const [id, setId] = useState(0);
    const [merchant, setMerchant] = useState("");
    const [adjudicator1, setAdjudicator1] = useState("");
    const [adjudicator2, setAdjudicator2] = useState("");
    const [adjudicator3, setAdjudicator3] = useState("");
    const [adjudicator4, setAdjudicator4] = useState("");
    const [adjudicator5, setAdjudicator5] = useState("");
    const { address, status } = useAccount();
    const {data} = useSimulateContract({
        address: (process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`) || "",
        abi: RouterContract.abi,
        functionName: "on_ramp",
        args: ["0xcA51855FBA4aAe768DCc273349995DE391731e70", adjudicator1, adjudicator2, adjudicator3, adjudicator4, adjudicator5, 4],
    })

    const { writeContract } = useWriteContract();

    useWatchContractEvent({
        address: (process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`) || "",
        abi: RouterContract.abi,
        eventName: 'OnRampCreated',
        onLogs(logs) {
          console.log('New logs!', logs)
        },
      })

    const handleClick = () => {
        if(adjudicator1 === "" || adjudicator2 === "" || adjudicator3 === "" ){
            console.log("Value is empty");
            return
        }
        writeContract(
            {
                address: (process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`) || "",
                abi: RouterContract.abi,
                functionName: "on_ramp",
                args: ["0xcA51855FBA4aAe768DCc273349995DE391731e70", adjudicator1, adjudicator2, adjudicator3, adjudicator4, adjudicator5, 3],
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


    const {data: data2, refetch} = useReadContract({
        address: (process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS as `0x${string}`) || "",
        abi: GovernanceContract.abi,
        functionName: "get_the_five_adjudicator",
        args: [],
    })

    useEffect(()=>{
       if(data2){
        let adjudicator = data2 as string[];
        setAdjudicator1(adjudicator[0]);
        setAdjudicator2(adjudicator[1]);
        setAdjudicator3(adjudicator[2]);
        setAdjudicator4(adjudicator[3]);
        setAdjudicator5(adjudicator[4]);
       }
    }, [data2])

    return (
        <div>
            <Button onClick={()=>handleClick()}>
                On Ramp
            </Button>
        </div>
    )
}