import { useContractRead } from "wagmi";
import Basepaint from "./abi";
import DynamicOffchain from "@/components/DynamicOffchain";
import { useEffect, useState } from "react";

const BasePaint = () => {
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

  return (
    <DynamicOffchain
      key={today}
      baseUrl={`https://basepaint.xyz/api/art/image?day=${
        today ? today.toString() : 100
      }`}
    />
  );
};

export default BasePaint;
