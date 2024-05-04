"use client";
import { Button, Image } from "@chakra-ui/react";
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
    <div className="h-20 bg-slate-400 flex flex-row justify-between p-5">
      <div className="flex flex-row gap-3">
        <Image className="w-[36px] h-[36px]" src="/fxlogo.png" alt="fxlogo" />
        <div className="text-3xl">Trasaction {id}</div>
      </div>{" "}
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
  const router = useRouter();

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
  const [fiatRecieved, setFiatRecieved] = useState(false);

  const [cryptoSent, setCryptoSent] = useState(false);
  const [cryptoRecieved, setCryptoRecieved] = useState(false);

  //   function handleFiatSent() {
  //     //update db state
  //     // address | fiat sent? |
  //     setFiatSent(true);
  //   }

  async function handleFiatRecieved() {
    const { data } = await supabase
      .from("transactions")
      .select("fiatSent")
      .eq("address", address)
      .single();
    setFiatSent(data!.fiatSent);
  }

  async function handleCryptoSent() {
    // call contract to release
    const { data } = await supabase
      .from("transactions")
      .update({ cryptoSent: true })
      .eq("address", address)
      .single();
    setCryptoSent(true);
  }

  async function checkDB() {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("address", address)
      .single();
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
      <div className="flex justify-center flex-col items-center gap-5 mt-3">
        <div className="text-3xl italic">Progress</div>
        <div className="grid grid-cols-2 justify-center items-center gap-40">
          <div className="flex flex-col justify-center items-center ">
            <>Recieve Fiat</>
            <Status stat={fiatSent} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <>Transfer Crypto</>
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
        ) : fiatSent ? (
          <div>
            <div className="flex justify-center flex-col items-center gap-5 mt-3">
              <div className="w-[60%]">
                <div>Action items: </div>
                <ul style={{ listStyleType: "disc" }}>
                  <li>
                    Verify the receipt of IDR 1,633,000.00 in your bank account
                    4287779789 (BCA). Your counterparty’s bank account is
                    8210644793 (BCA).
                  </li>
                  <li>
                    Upon verifying fiat receipt, click “fiat received, release
                    crypto” button to finalize the transaction.
                  </li>
                  <li>
                    Once crypto is sent successfully, click “fiat received,
                    crypto sent” button to proceed.
                  </li>
                  <li>
                    If you did not receive IDR 1,633,000.00 in your bank
                    account, press the “fiat not received, raise dispute” button
                    to bring this transaction into dispute.
                  </li>
                </ul>
              </div>
              <div className="flex flex-row gap-5">
                <Button colorScheme="red">
                  Fiat not received, Raise Dispute
                </Button>
                <Button colorScheme="green" onClick={handleCryptoSent}>
                  Fiat Recieved, Crypto Sent
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[60%] flex justify-center flex-col items-center gap-5 mt-3">
            <ul className="space-y-5">
              <li>
                Your counterparty is currently in the process of transferring
                IDR 1,633,000.00 to your bank account 4287779789 (BCA).
              </li>
              <li>
                This page will automatically update once your counterparty has
                made the transfer. You will then be asked to release crypto to
                your counterparty’s address.
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
