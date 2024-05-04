"use client";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation";

function TopBar() {
  return (
    <div className="h-20 bg-slate-200 flex flex-row justify-between p-5">
      <div className="text-3xl"></div>
      <div>
        <Button>M</Button>
        <Button>profile</Button>
      </div>
    </div>
  );
}

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <TopBar />
    </div>
  );
}
