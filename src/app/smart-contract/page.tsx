"use client";
import { useRegisterMerchant } from "../../hooks/RegisterMerchant";

export default function SmartContract() {
    const { amount, setAmount, handleClick } = useRegisterMerchant();

    return (
        <div>
            <h1>Smart Contract Page</h1>
            <h2>Amount</h2>
            <input value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            <div>
                <button onClick={handleClick}>
                    Register
                </button>
            </div>
        </div>
    );
}
