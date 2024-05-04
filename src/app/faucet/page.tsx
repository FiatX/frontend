"use client";
import { useMintERC20 } from "@/hooks/MintERC20";
import { Button, Input } from "@chakra-ui/react";

export default function FaucetMint() {
    const { amount, setAmount, handleMint } = useMintERC20();

    return (
        <div>
            <h1>Faucet Page</h1>
            <h2>Amount</h2>
            <Input value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            <div>
                <Button onClick={handleMint}>
                    Mint
                </Button>
            </div>
        </div>
    );
}
