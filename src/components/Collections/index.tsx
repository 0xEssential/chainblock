import "../DynamicOffchain";
import StaticImageNFT from "../StaticImageNFT";
import IFrameNFT from "../IframeNFT";
import { NEXT_PUBLIC_FINI_KEY } from "@/env";

type chain = 1 | 137 | 8453 | 7777777 | 10 | 42161;

export type NFTProps = {
  chainId: number;
  contractAddress: `0x${string}`;
  tokenId: bigint;
  nftId: string;
};

type SupportedProjects = Record<
  `${chain}:0x${string}`,
  (props: NFTProps) => JSX.Element
>;

const supportedProjects = {
  "8453:0x34E817D631b7FB79A54638c01c03421D124E35a7": (props: NFTProps) => (
    <StaticImageNFT {...props} metadataParams={{ key: NEXT_PUBLIC_FINI_KEY }} />
  ),
  "1:0x5a0121a0a21232ec0d024dab9017314509026480": (props: NFTProps) => (
    <StaticImageNFT {...props} metadataParams={{ key: NEXT_PUBLIC_FINI_KEY }} />
  ),
  "1:0xe7B32E7de014F124C0B126AC046aE859C4C6F0A3": (props: NFTProps) => (
    <StaticImageNFT {...props} />
  ),
  "1:0x43FEB96b779B9535C06E2e1c08251622fd46CA9F": (props: NFTProps) => (
    <IFrameNFT {...props} />
  ),
  "1:0xC17030798a6D6E1A76382cf8F439182eB0342D93": (props: NFTProps) => (
    <StaticImageNFT {...props} />
  ),
  "1:0x32f8F03197c55741ccF8Dea9D8f014281bd30183": (props: NFTProps) => (
    <StaticImageNFT {...props} />
  ),
  "1:0xAcf975eb1B2920b49E611781E1630267963B32A": (props: NFTProps) => (
    <StaticImageNFT {...props} />
  ),
  "1:0x8436ce6e2aa67abf9040b22fba1847e3e61fb6d7": (props: NFTProps) => (
    <StaticImageNFT {...props} />
  ),
  "1:0x18Adc812fE66B9381700C2217f0c9DC816c879E6": (props: NFTProps) => (
    <IFrameNFT {...props} />
  ),
  "1:0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270": (props: NFTProps) => (
    <StaticImageNFT {...props} />
  ),
} as SupportedProjects;

export default supportedProjects;
