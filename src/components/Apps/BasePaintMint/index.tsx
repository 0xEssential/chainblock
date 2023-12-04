import { Button } from "@/components/ui/button";

import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Basepaint from "./abi";
import DynamicOffchain from "@/components/DynamicOffchain";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { parseEther } from "viem";

const BasePaintMint = () => {
  const { data: today, refetch } = useContractRead({
    ...Basepaint,
    functionName: "today",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000 * 60 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { config } = usePrepareContractWrite({
    ...Basepaint,
    functionName: "mint",
    args: [(today || 100n) - 1n, 1n],
    enabled: Boolean(today),
    value: parseEther("0.0026"),
  });

  const { write } = useContractWrite(config);

  return (
    <div className={styles.container}>
      <DynamicOffchain
        key={today}
        baseUrl={`https://basepaint.xyz/api/art/image?day=${
          today ? (today - 1n).toString() : 100
        }`}
      />
      <div className={styles.mint}>
        <Button size="lg" onClick={() => write?.()} disabled={!write}>
          Mint for 0.0026 ETH
        </Button>
      </div>
      );
    </div>
  );
};

export default BasePaintMint;
