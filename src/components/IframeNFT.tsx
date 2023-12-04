import { erc721ABI, useContractRead } from "wagmi";

import { useEffect, useState } from "react";
import { NFTProps } from "./Collections";
import { replaceIpfsUri } from "@/utils";
import { useSwiperSlide } from "swiper/react";
import { ANIMATION_TIMING } from "./Slideshow";

const IFrameNFT = ({ chainId, contractAddress, tokenId }: NFTProps) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [baseUrl, setBaseUrl] = useState<string>("");
  const swiperSlide = useSwiperSlide();

  const { data, refetch } = useContractRead({
    abi: erc721ABI,
    chainId,
    address: contractAddress,
    functionName: "tokenURI",
    args: [tokenId],
  });

  useEffect(() => {
    if (!swiperSlide.isActive) {
      setTimeout(() => setVisible(false), ANIMATION_TIMING * 0.8);
    }
    if (swiperSlide.isActive || swiperSlide.isNext) {
      setVisible(true);
    }
  }, [swiperSlide.isActive, swiperSlide.isNext]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000 * 60 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (swiperSlide.isNext) {
      setVisible(true);
    }
  }, [swiperSlide.isNext]);

  useEffect(() => {
    if (!data) return;

    const getImage = async () => {
      fetch(replaceIpfsUri(data))
        .then(async (res) => {
          const json = await res.json();
          setBaseUrl(replaceIpfsUri(json.animation_url));
        })
        .catch((err) => {
          console.error(err);
          setBaseUrl("/background.png");
        });
    };

    getImage();
  }, [data]);

  return (
    <div className="panel">
      {visible && baseUrl ? (
        <iframe width="100%" src={baseUrl} allow="autoplay" />
      ) : (
        <p className="text-6xl">Error</p>
      )}
    </div>
  );
};

export default IFrameNFT;
