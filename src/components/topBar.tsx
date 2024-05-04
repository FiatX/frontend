import { Button, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { createClient } from "@supabase/supabase-js";

export const TopBar = ({ id }: { id: string }) => {
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

export const TopBarDef = () => {
  const router = useRouter();
  return (
    <div className="h-20 bg-slate-400 flex flex-row justify-between p-5">
      <div className="flex flex-row gap-3">
        <Image className="w-[36px] h-[36px]" src="/fxlogo.png" alt="fxlogo" />
        <div className="text-3xl">Trasaction</div>
      </div>
      <div className="space-x-3">
        <Button colorScheme="red" onClick={() => router.replace(`/dashboard`)}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};
