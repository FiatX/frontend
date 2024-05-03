"use client";
import React from "react";
import Logo from "@/components/logo";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Logo />
      <Button onClick={() => router.replace(`/user`)}>onramp / offramp</Button>
      <Button onClick={() => router.replace(`/merchant`)}>
        Merchant Portal
      </Button>
      <Button onClick={() => router.replace(`/`)}>Dispute Portal</Button>
    </div>
  );
}
