"use client";
import { Button, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

export default function Merchant() {
  //mechants lock crypto
  //user send fiat

  //mechants send fiat
  //user lock crypto
  const pathname = usePathname();
  const address = pathname.split("/")[2];

  // case1: merchant lock crypto and recieve fiat
  //ONRAMP

  //FETCH DB Data
  const [fiatSent, setFiatSent] = useState(false);
  const [cryptoRecieved, setCryptoRevieved] = useState(false);

  function handleFiatSent() {
    //update db state
    // address | fiat sent? |
    setFiatSent(true);
  }

  async function checkFiatRecieved() {
    const { data } = await supabase
      .from("transactions")
      .select("fiatSent")
      .eq("address", address)
      .single();
    setFiatSent(data!.fiatSent);
    return fiatSent;
  }

  async function checkDB() {
    // check if fiat sent?
    // check if fiat recieved
    // chec
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("address", address)
      .single();
    console.log(data);
  }
  useEffect(() => {
    checkFiatRecieved();
    checkDB();
  }, []);

  return (
    <div>
      <TopBar id={address} />
      <div className="flex justify-center flex-col items-center gap-5 mt-3">
        <div className="text-3xl italic">Progress</div>
        <div className="grid grid-cols-2 justify-center items-center gap-40">
          <div className="flex flex-col justify-center items-center ">
            <>Recieve Fiat</>
            <Status stat={fiatSent} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <>Transfer Crypto</>
            <Status stat={cryptoRecieved} />
          </div>
        </div>

        {!fiatSent ? (
          <div className="w-[60%]">{`Your counterparty is currently in the process of transferring AUD 9,308.4 to your bank 061111-12345678 (Commonwealth) or 052222-12345678 (Westpac).

                  This page will automatically update once your counterparty has made the transfer and is now ready to receive crypto.
                  
                  Timeout is set at 15 mins. No action is required for now.`}</div>
        ) : (
          <div className="flex justify-center flex-col items-center gap-5 mt-3">
            <div className="w-[60%]">
              Action items: Verify the receipt of AUD 9,308.4 in your bank
              account 061111-12345678 (Commonwealth) or 052222-12345678
              (Westpac). Sender bank account is 023333-87654321 (ANZ). Upon
              verifying fiat receipt, proceed to send 6,000 USDC to
              0x987654321zyxwuvqxlaue on Base. You must send the crypto from
              your FiatX-linked address 0x123456789abcdefghijkl. Once crypto is
              sent successfully, click “fiat received, crypto sent” button to
              proceed. If you did not receive AUD 9,308.4 to your bank account
              after 15 mins, the “fiat not received, raise dispute” button will
              be made available to you. Press it to raise dispute with your
              counterparty.
            </div>
            <div>
              <Button colorScheme="red">
                Fiat not received, Raise Dispute
              </Button>
              <Button colorScheme="green">Fiat Recieved, Crypto Sent</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
