import React, { ReactElement } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import supportedProjects, { NFTProps } from "./Collections";
import useSWR from "swr";
import { useAccount } from "wagmi";
import BlockClock from "./Apps/BlockClock";
import BasePaint from "./Apps/BasePaint";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard, Zoom } from "swiper/modules";
import StaticImageNFT from "./StaticImageNFT";
import { NEXT_PUBLIC_SIMPLEHASH_KEY } from "@/env";
import BasePaintMint from "./Apps/BasePaintMint";

const networks = {
  ethereum: 1,
  polygon: 137,
  base: 8453,
  zora: 7777777,
  optimism: 10,
  arbitrum: 42161,
} as Record<string, number>;

export const ANIMATION_TIMING = 300;

const Slideshow = ({ flip }: { flip: () => void }): ReactElement => {
  const { address } = useAccount();

  const { data, isLoading } = useSWR(address, async () => {
    const tokens = await fetch(
      `https://api.simplehash.com/api/v0/nfts/owners?chains=${Object.keys(
        networks
      ).join(",")}&wallet_addresses=${address}&contract_addresses=${Object.keys(
        supportedProjects
      )
        .map((s) => s.split(":")[1])
        .join(",")}&limit=50`,
      {
        headers: {
          "X-API-KEY": NEXT_PUBLIC_SIMPLEHASH_KEY,
        },
      }
    )
      .then((resp) => resp.json())
      .catch((e) => {
        console.error(e);
      });

    return tokens;
  });

  const ownedTokens =
    data?.nfts?.map((nft: any) => ({
      chainId: networks[nft.chain],
      contractAddress: nft.contract_address,
      tokenId: BigInt(nft.token_id),
      nftId: nft.nft_id,
    })) || [];

  const tokens: NFTProps[] = [
    {
      chainId: 1,
      contractAddress: "0x18Adc812fE66B9381700C2217f0c9DC816c879E6",
      tokenId: 164n,
      nftId: "chaos roads",
    },
    {
      chainId: 1,
      contractAddress: "0x20C70BDFCc398C1f06bA81730c8B52ACE3af7cc3",
      tokenId: 12884540n,
      nftId: "mgs",
    },
    {
      chainId: 1,
      contractAddress: "0x5a0121a0a21232ec0d024dab9017314509026480",
      tokenId: 5304n,
      nftId: "fini",
    },
    ...ownedTokens,
  ];

  return (
    <Swiper
      speed={ANIMATION_TIMING}
      loop
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 30_000 }}
      edgeSwipeDetection="prevent"
      keyboard={{ enabled: true }}
      modules={[Autoplay, EffectFade, Keyboard, Zoom]}
      lazyPreloadPrevNext={2}
      onDoubleClick={flip}
    >
      <SwiperSlide>
        <BasePaintMint />
      </SwiperSlide>
      <SwiperSlide>
        <BasePaint />
      </SwiperSlide>
      <SwiperSlide>
        <BlockClock />
      </SwiperSlide>

      {tokens.map((nft, index) => {
        const { chainId, contractAddress } = nft;
        const id =
          `${chainId}:${contractAddress}` as keyof typeof supportedProjects;
        const Project = supportedProjects[id] || StaticImageNFT;
        return (
          <SwiperSlide key={`${id}-${index}`}>
            <Project {...nft} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slideshow;
