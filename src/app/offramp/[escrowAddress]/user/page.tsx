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

export default function OffchainUser() {
  const router = useRouter();

  const pathname = usePathname();
  const address = pathname.split("/")[2];

  const [fiatSent, setFiatSent] = useState(false);
  const [fiatRecieved, setFiatRecieved] = useState(false);

  const [cryptoSent, setCryptoSent] = useState(false);
  const [cryptoRecieved, setCryptoRecieved] = useState(false);

  async function handleCryptoSent() {
    //Call contract to release fund
    // await releaseCryptocontract
    const { error } = await supabase
      .from("transactions")
      .update({ cryptoSent: true })
      .eq("address", address);
    console.error(error);
    setCryptoSent(true);
  }

  async function checkDB() {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("address", address)
      .single();
    setFiatSent(data!.fiatSent);
    setCryptoRecieved(data!.cryptoRecieved);
    setCryptoSent(data!.cryptoSent);
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
            <>Receive Fiat</>
            <Status stat={fiatSent} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <>Release Crypto</>
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
          <>
            <div className="w-[60%]">
              Action items: Verify the receipt of IDR 806,000.00 in your bank
              account 8210644793 (BCA). Your merchant’s bank account is
              4287779789 (BCA). Upon verifying fiat receipt, click “fiat
              received, release crypto” button to finalize the transaction. If
              you did not receive IDR 806,000.00 to your bank account after 15
              mins, press the “fiat not received, raise dispute” button to bring
              this transaction into dispute.
            </div>
            <Button colorScheme="red">Fiat not received, Raise Dispute</Button>
            <Button colorScheme="green" onClick={handleCryptoSent}>
              Fiat Received, Release Crypto
            </Button>
          </>
        ) : (
          <div className="w-[60%]">
            You have deposited 50 USDC in escrow on Mantle. Your merchant is
            currently in the process of transferring IDR 806,000.00 to your bank
            account 8210644793 (BCA). This page will automatically update once
            your merchant has made the transfer. You will then be asked to
            release your crypto to your merchant. Timeout is set at 15 mins. No
            action is required for now.
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
