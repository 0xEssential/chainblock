import { erc721ABI, useContractRead } from "wagmi";

import { useEffect, useState } from "react";
import { NFTProps } from "./Collections";
import { replaceIpfsUri } from "@/lib/utils";
import Image from "next/image";

const StaticImageNFT = ({
  chainId,
  contractAddress,
  tokenId,
  metadataParams,
}: NFTProps & { metadataParams?: Record<string, string> }) => {
  const [baseUrl, setBaseUrl] = useState<string>("");

  const { data, refetch } = useContractRead({
    abi: erc721ABI,
    chainId,
    address: contractAddress,
    functionName: "tokenURI",
    args: [tokenId],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000 * 60 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!data) return;

    const getImage = async () => {
      const url = replaceIpfsUri(data);

      const params = new URLSearchParams(metadataParams).toString();
      const fullUrl = params ? `${url}?${params}` : url;
      fetch(fullUrl)
        .then(async (res) => {
          const json = await res.json();
          setBaseUrl(replaceIpfsUri(json.image));
        })
        .catch(() => {
          setBaseUrl("/background.png");
        });
    };

    getImage();
  }, [data]);

  return (
    <div className="panel">
      {baseUrl ? (
        <div className="swiper-zoom-container">
          <Image
            alt="NFT Image"
            src={baseUrl}
            fill
            priority
            style={{ position: "absolute", objectFit: "contain" }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default StaticImageNFT;
