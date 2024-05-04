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
  const router = useRouter();

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
    setFiatRecieved(data!.fiatRecieved);
    setCryptoSent(data!.cryptoSent);
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
            <Status stat={cryptoSent} />
          </div>
        </div>

        {cryptoSent && fiatSent ? (
          <div className="flex flex-col gap-5">
            <div>Transaction complete</div>
            <Button
              colorScheme="red"
              onClick={() => router.replace(`/dashboard`)}
            >
              Back to Dashboard
            </Button>
          </div>
        ) : !fiatSent ? (
          <div className="flex justify-center flex-col items-center gap-5 mt-3">
            <div className="w-[60%]">
              <div>Action items: </div>
              <ul style={{ listStyleType: "disc" }}>
                <li>
                  Transfer IDR 1,633,000.00 from your bank account 8210644793
                  (BCA) to your merchant’s bank account 4287779789 (BCA).
                </li>
                <li>
                  Once fiat transfer is successful, click “transferred, notify
                  merchant” button.
                </li>
                <li>
                  Should you wish to cancel the trade, DO NOT transfer fiat and
                  press “cancel transaction”. If you have transferred fiat, you
                  MUST notify your merchant to complete the trade – not doing so
                  may result in permanent loss of funds.
                </li>
              </ul>
            </div>
            <div className="flex flex-row gap-5">
              <Button colorScheme="red">Cancel Transaction</Button>
              <Button colorScheme="blue" onClick={handleFiatSent}>
                Transferred, notify Merchant
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-[60%] flex justify-center flex-col items-center gap-5 mt-3">
            <ul className="space-y-5">
              <li>
                Your merchant is currently in the process of verifying the
                receipt of IDR 1,633,000.00 in the bank account 4287779789
                (BCA).
              </li>
              <li>
                This page will automatically update once your counterparty has
                verified the receipt and settled this transaction.
              </li>
              <li>
                Transaction time limit is set at 15 mins. No action is required
                for now.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
