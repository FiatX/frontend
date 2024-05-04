"use client";
import React, { use, useEffect, useState } from "react";
import Logo from "@/components/logo";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Divider from "@/components/divider";
import { Image } from "@chakra-ui/react";

function TopBar() {
  const router = useRouter();
  return (
    <div className="h-20 bg-slate-400 flex flex-row justify-between p-5">
      <div className="flex flex-row gap-3">
        <Image className="w-[36px] h-[36px]" src="/fxlogo.png" alt="fxlogo" />
        <div className="text-3xl">Merchant Configuration</div>
      </div>
    </div>
  );
}
const ConfigurationInput = ({
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
        w={700}
        isRequired={true}
      />
    </div>
  );
};

export default function Page() {
  const [currency, setCurrency] = useState("");
  const [paymentRail, setPaymentRail] = useState("");

  return (
    <div>
      <TopBar />
      <Divider />
      <ConfigurationInput label="Fiat Currencies" setter={setCurrency} />
      <ConfigurationInput label="Payment Rail(s)" setter={setPaymentRail} />
      <ConfigurationInput label="" setter={setPaymentRail} />

      <Button onClick={() => console.log(currency, paymentRail)}>Save</Button>
    </div>
  );
}
