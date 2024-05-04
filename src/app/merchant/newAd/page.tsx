"use client";

import { Button, Image, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { createClient } from "@supabase/supabase-js";
import { useWriteContract } from "wagmi";
import { usePostOfferOnRamp } from "@/hooks/PostOfferOnRamp";
import { usePostOfferOffRamp } from "@/hooks/PostOfferOffRamp";

const TopBar = () => {
  const router = useRouter();

  return (
    <div className="h-20 bg-slate-400 flex flex-row justify-between p-5">
      <div className="flex flex-row gap-3">
        <Image className="w-[36px] h-[36px]" src="/fxlogo.png" alt="fxlogo" />
        <div className="text-3xl">Create New Ad</div>
      </div>
      <Button colorScheme="red" onClick={() => router.replace(`/merchant`)}>
        Back to Merchant Dashboard
      </Button>
    </div>
  );
};

const AdInput = ({
  label,
  setter,
  h,
}: {
  label: string;
  setter: (value: string) => void;
  h?: string;
}) => {
  const handleChange = (e: any) => {
    setter(e.target.value);
  };

  return (
    <div className="flex justify-between">
      <label className="mr-2">{label}</label>
      <Input
        onChange={(event) => setter(event.target.value)}
        // w={700}
        isRequired={true}
      />
    </div>
  );
};

export default function page() {
  const router = useRouter();

  const [adType, setAdType] = useState("sell");
  const [fiatCurrency, setfiatCurrency] = useState("");
  const [crypto, setCrypto] = useState("usdc");
  const [chain, setChain] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [time, setTime] = useState("15 mins");
  const [maxTradeSize, setMaxTradeSize] = useState("");

  async function submit() {
    if (adType === "sell") {
      const {
        amount,
        setAmount,
        symbol,
        setSymbol,
        fiatAmount,
        setFiatAmount,
        handleClick,
      } = usePostOfferOnRamp();
      setAmount(amount);
      setSymbol(symbol);
      setFiatAmount(fiatAmount);
      handleClick();
    } else {
      const {
        amount,
        setAmount,
        symbol,
        setSymbol,
        fiatAmount,
        setFiatAmount,
        handleClick,
      } = usePostOfferOffRamp();
      setAmount(amount);
      setSymbol(symbol);
      setFiatAmount(fiatAmount);
      handleClick();
    }
    console.log(
      adType,
      fiatCurrency,
      crypto,
      chain,
      exchangeRate,
      time,
      maxTradeSize
    );
  }

  return (
    <div>
      <TopBar />

      <div className="flex flex-col px-5 space-y-5">
        <div className="flex-row flex">
          <label>Market Type</label>
          <Select
            onChange={(value: any) => setAdType(value)}
            defaultValue={"sell"}
          >
            <option value="sell">Sell Crypto</option>
            <option value="buy">Buy Crypto</option>
          </Select>
        </div>

        <AdInput label="Select Fiat Currency" setter={setfiatCurrency} />

        <div className="flex-row flex">
          <label>Select Crypto</label>
          <Select
            onChange={(value: any) => setCrypto(value)}
            defaultValue={"sell"}
          >
            <option value="usdc">USDC</option>
            <option value="usdt">USDT</option>
          </Select>
        </div>

        <div className="flex-row flex">
          <label>Select Chain(s)</label>
          <Select
            onChange={(value: any) => setChain(value)}
            defaultValue={"Mantle"}
          >
            <option value="mantle">Mantle</option>
            <option value="base">Base</option>
            <option value="polygon">Polygon zkEvm Cordana</option>
            <option value="avail">Avail OP Stack</option>
          </Select>
        </div>

        <AdInput label="Exchange Rate" setter={setExchangeRate} />

        <div className="flex-row flex">
          <label>Trade Time Limit (mins)</label>
          <Select
            onChange={(value: any) => setTime(value)}
            defaultValue={"15 mins"}
          >
            <option value="15">15 mins</option>
            <option value="30">30 mins</option>
          </Select>
        </div>

        <AdInput label="Max Trade Size" setter={setMaxTradeSize} />

        <Button onClick={() => submit()}>Login</Button>
      </div>
    </div>
  );
}
