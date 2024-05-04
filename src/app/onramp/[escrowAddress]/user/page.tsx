"use client";
import { Button, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { createClient } from "@supabase/supabase-js";
import { useAccount } from "wagmi";
import { IDKitWidget } from "@worldcoin/idkit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TopBar = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <div className="h-20 bg-slate-400 flex flex-row justify-between p-5">
      <div className="flex flex-row gap-3">
        <Image className="w-[36px] h-[36px]" src="/fxlogo.png" alt="fxlogo" />
        <div className="text-3xl">Trasaction {id}</div>
      </div>
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

export default function User() {
  //user send fiat
  //mechants lock crypto

  //user lock crypto
  //mechants send fiat
  const pathname = usePathname();
  const address = pathname.split("/")[2];
  // case1: user send fiat and recieve crypto
  //ONRAMP
  // offchain data:
  // fiat sent status
  const [fiatSent, setFiatSent] = useState(false);
  const [fiatRecieved, setFiatRecieved] = useState(false);

  const [cryptoSent, setCryptoSent] = useState(false);
  const [cryptoRecieved, setCryptoRecieved] = useState(false);

  async function handleFiatSent() {
    //update db state
    // address | fiat sent?
    const { error } = await supabase
      .from("transactions")
      .update({ fiatSent: true })
      .eq("address", address);
    console.error(error);
    setFiatSent(true);
  }

  async function handleCryptoRecieved() {
    const { data } = await supabase
      .from("transactions")
      .update({ cryptoRecieved: true })
      .eq("address", address)
      .single();
    console.log(data);
    setCryptoRecieved(true);
    return cryptoSent;
  }

  async function checkDB() {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("address", address)
      .single();
    console.log(data);
    setFiatSent(data!.fiatSent);
    // setFiatRecieved(data!.fiatRecieved);
    // setCryptoSent(data!.cryptoSent);
    setCryptoRecieved(data!.cryptoRecieved);
  }

  useEffect(() => {
    checkDB();
  }, []);

  return (
    <div>
      <TopBar id={address} />
      {/* <ConnectButton /> */}
      <div className="flex justify-center flex-col items-center gap-5 mt-3">
        <div className="text-3xl italic">Progress</div>
        <div className="grid grid-cols-2 justify-center items-center gap-40">
          <div className="flex flex-col justify-center items-center ">
            <>Transfer Fiat</>
            <Status stat={fiatSent} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <>Recieve Crypto</>
            <Status stat={cryptoRecieved} />
          </div>
        </div>
        <div className="w-[60%]">
          Description Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Excepturi temporibus aliquam, nisi doloremque delectus ad illo
          expedita eligendi? Quae laudantium placeat odio aperiam sequi vitae
          omnis praesentium dolore possimus magnam.
        </div>
        {cryptoRecieved && fiatSent ? (
          <>Transaction complete</>
        ) : !fiatSent ? (
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
            <Button colorScheme="green" onClick={handleCryptoRecieved}>
              Crypto Recieved, Settle P2P
            </Button>
          </div>
        )}
      </div>

      {/* <IDKitWidget
        app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT" // must be an app set to on-chain in Developer Portal
        action="verify"
        signal={walletAddress} // proof will only verify if the signal is unchanged, this prevents tampering
        onSuccess={onSuccess} // use onSuccess to call your smart contract
      >
        {({ open }) => <Button onClick={open}>Verify with World ID</Button>}
      </IDKitWidget> */}
    </div>
  );
}