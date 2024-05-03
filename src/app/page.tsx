"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";
import Logo from "../components/logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Logo />
      {/* <ConnectButton /> */}
      <Button onClick={() => router.replace(`/dashboard`)}>
        Sign in with Worldcoin
      </Button>
    </div>
  );
}
