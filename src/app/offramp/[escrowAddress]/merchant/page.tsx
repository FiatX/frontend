"use client";
import { Button, Divider, Image } from "@chakra-ui/react";
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
        <div className="text-3xl">Merchant Dashboard</div>
      </div>

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

export default function OffChainMerchant() {
  const router = useRouter();
  const pathname = usePathname();
  const address = pathname.split("/")[2];

  const [fiatSent, setFiatSent] = useState(false);
  const [fiatRecieved, setFiatRecieved] = useState(false);

  const [cryptoSent, setCryptoSent] = useState(false);
  const [cryptoRecieved, setCryptoRecieved] = useState(false);

  async function handleFiatSent() {
    const { error } = await supabase
      .from("transactions")
      .update({ fiatSent: true })
      .eq("address", address);
    console.error(error);
    setFiatSent(true);
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
            <>Transfer Fiat</>
            <Status stat={fiatSent} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <>Recieve Crypto</>
            <Status stat={cryptoSent} />
          </div>
        </div>

        {fiatSent && cryptoSent ? (
          <>
            <>Transaction Done</>
            <Button
              colorScheme="red"
              onClick={() => router.replace(`/dashboard`)}
            >
              Back to Dashboard
            </Button>{" "}
          </>
        ) : fiatSent ? (
          <div className="w-[60%]">
            Your counterparty is currently in the process of verifying the
            receipt of IDR 806,000.00 in the bank account 8210644793 (BCA). This
            page will automatically update once your counterparty has verified
            the receipt and settle this transaction. Transaction time limit is
            set at 15 mins. No action is required for now.
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center gap-5 mt-3">
            <div className="w-[60%]">
              Action items: Transfer IDR 806,000.00 from your bank 4287779789
              (BCA) to your counterparty’s bank 8210644793 (BCA). Once fiat
              transfer is successful, click “transferred, notify merchant”
              button. Should you wish to cancel the trade, DO NOT transfer fiat
              and press “cancel transaction”. If you have transferred fiat, you
              MUST notify your counterparty to complete the trade – not doing so
              may result in permanent loss of funds.
            </div>
            <div>
              <Button colorScheme="red">Cancel Transaction </Button>
              <Button colorScheme="green" onClick={handleFiatSent}>
                Fiat Transferred, Notify counterparty
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
