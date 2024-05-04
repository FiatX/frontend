"use client";
import { Button, Divider } from "@chakra-ui/react";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const TopBar = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <div className="h-20 bg-slate-200 flex flex-row justify-between p-5">
      <div className="text-3xl">Trasaction {id}</div>
      <div className="space-x-3">
        <Button colorScheme="red" onClick={() => router.replace(`/dashboard`)}>
          Back to Dashboard
        </Button>
        <Button>M</Button>
        <Button onClick={() => router.replace(`/merchant/config`)}>
          profile
        </Button>
      </div>
    </div>
  );
};

const Status = ({ stat = false }: { stat?: Boolean }) => {
  return (
    <div
      className={`h-[50px] w-[50px] rounded-full ${
        stat ? "bg-green-500" : "bg-red-500"
      } `}
    >
      {""}
    </div>
  );
};

export default function user() {
  //user send fiat
  //mechants lock crypto

  //user lock crypto
  //mechants send fiat
  const pathname = usePathname();

  // case1: user send fiat and recieve crypto
  //ONRAMP
  // offchain data:
  // fiat sent status
  const [fiatSent, setFiatSent] = useState(false);

  function handleFiatSent() {
    //update db state
    // address | fiat sent? |
    setFiatSent(true);
  }
  return (
    <div>
      <TopBar id={pathname.split("/")[2]} />
      <div className="flex justify-center flex-col items-center gap-5 mt-3">
        <div className="text-3xl italic">Progress</div>
        <div className="grid grid-cols-2 justify-center items-center gap-40">
          <div className="flex flex-col justify-center items-center ">
            <>Transfer Fiat</>
            <Status stat={false} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <>Recieve Crypto</>
            <Status stat={false} />
          </div>
        </div>
        <div className="w-[60%]">
          Description Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Excepturi temporibus aliquam, nisi doloremque delectus ad illo
          expedita eligendi? Quae laudantium placeat odio aperiam sequi vitae
          omnis praesentium dolore possimus magnam.
        </div>
        {/* check fiat sent or not on db*/}
        {!fiatSent ? (
          <div>
            <Button colorScheme="red">Cancel Transaction</Button>
            <Button colorScheme="blue" onClick={handleFiatSent}>
              Transferred, notify Merchant
            </Button>
          </div>
        ) : (
          <div>
            <Button colorScheme="red">
              Crypto not Recieved, Raise Dispute
            </Button>
            <Button colorScheme="green" onClick={handleFiatSent}>
              Crypto Recieved, Settle P2P
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
