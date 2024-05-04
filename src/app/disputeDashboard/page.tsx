"use client";
import {
  Button,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { createClient } from "@supabase/supabase-js";

function TopBar() {
  const router = useRouter();
  return (
    <div className="h-20 bg-slate-400 flex flex-row justify-between p-5">
      <div className="flex flex-row gap-3">
        <Image className="w-[36px] h-[36px]" src="/fxlogo.png" alt="fxlogo" />
        <div className="text-3xl">Dispute Portal</div>
      </div>
      <Button colorScheme="red" onClick={() => router.replace(`/merchant`)}>
        Back to Dashboard
      </Button>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <TopBar />
      <div className="mx-10">
        <div className="text-4xl py-5">Voting Power</div>

        <div className="bg-slate-400 flex flex-row justify-between p-5 rounded-xl">
          <div className="flex flex-row">
            <div className="h-[60px] w-[60px] rounded-full bg-slate-500 flex justify-center items-center mr-3">
              FX
            </div>
            <div className="flex flex-col justify-center">
              <div>
                <span>{"25,000 "}</span>
                Staked
              </div>
              <div> {"32,000 "} voting power (unlock ~91 days)</div>
            </div>
          </div>

          <div className="flex flex-col justify-center ">
            <div className="flex gap-5">
              <Button>Stake</Button>
              <Button>Claim</Button>
            </div>
          </div>
        </div>

        <div className="text-2xl py-5">Transaction Disputes</div>

        <TableContainer className="flex justify-center items-center">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{""}</Th>
                <Th>Type</Th>
                <Th>Value at Risk</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td>Tx id 1</Td>
                <Td>Offramp</Td>
                <Td>{"50"} USDC</Td>
                <Th>
                  <Button>Action Needed</Button>
                </Th>
              </Tr>
              <Tr>
                <Td>Tx id 2</Td>
                <Td>Onramp</Td>
                <Td>{"150"} USDC</Td>
                <Th>
                  <Button>Action Needed</Button>
                </Th>
              </Tr>{" "}
              <Tr>
                <Td>Tx id 1</Td>
                <Td>Offramp</Td>
                <Td>{"50"} USDC</Td>
                <Th>
                  <Button>Action Needed</Button>
                </Th>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
