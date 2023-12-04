import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const replaceIpfsUri = (data: string) => {
  return data.replace(/ipfs:\/\/(?:ipfs\/)?(.*)/, "https://ipfs.io/ipfs/$1");
};
