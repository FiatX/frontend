"use client";
import Divider from "@/components/divider";
import {
  Divider as ChakraDivider,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

function TopBar() {
  const router = useRouter();
  return (
    <div className="h-20 bg-slate-400 flex flex-row justify-between p-5">
      <div className="flex flex-row gap-3">
        <Image className="w-[36px] h-[36px]" src="/fxlogo.png" alt="fxlogo" />
        <div className="text-3xl">P2P Dashboard</div>
      </div>
      <div>
        <Button colorScheme="red" onClick={() => router.replace(`/dashboard`)}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
const OnRamp = ({
  price,
  limit,
  id,
}: // onOpen,
// isOpen,
// onClose,
{
  price: string;
  limit: string;
  id: string;
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex justify-between bg-green-400 p-4 rounded-md w-[90%]">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>{price}</>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => router.replace(`/onramp/${id}/user`)}
            >
              Start onRamp
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="flex flex-col text-xl">
        <div>AUD {price}</div>
        <div>Transaction Limit {limit}</div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          onClick={
            onOpen
            // () => router.replace(`/onramp/${id}/user`)
          }
        >
          Details
        </Button>
      </div>
    </div>
  );
};

const OffRamp = ({
  price,
  limit,
  id,
}: {
  price: string;
  limit: string;
  id: string;
}) => {
  const router = useRouter();

  return (
    <div className="flex justify-between bg-blue-400 p-4 rounded-md w-[90%]">
      <div className="flex flex-col text-xl">
        <div>AUD {price}</div>
        <div>Transaction Limit {limit}</div>
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={() => router.replace(`/offramp/${id}/user`)}>
          Details
        </Button>
      </div>
    </div>
  );
};

const DetailModal = () => {};

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <TopBar />
      <Divider />

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="col-span-1 justify-center items-center flex flex-col">
          <div className="pb-5">On Ramp</div>
          <div className="flex flex-col space-y-5">
            <OnRamp price={"100"} limit={"22"} id={"aaaa"} />
            <OnRamp price={"1111100"} limit={"22222"} id={"aaaaaafaa"} />
          </div>
        </div>

        <div className="col-span-1 items-center flex flex-col">
          <div className="pb-5">Off Ramp</div>
          <div className="flex flex-col gap-5">
            <OffRamp price={"100"} limit={"22"} id={"dsa"} />
          </div>
        </div>
      </div>
    </div>
  );
}
