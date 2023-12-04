import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { walletConnectProvider } from "@web3modal/wagmi";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { arbitrum, base, mainnet, optimism, polygon, zora } from "viem/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { NEXT_PUBLIC_PROJECT_ID } from "@/env";

const projectId = NEXT_PUBLIC_PROJECT_ID;

const { chains, publicClient } = configureChains(
  [mainnet, base, zora, polygon, optimism, arbitrum],
  [publicProvider(), walletConnectProvider({ projectId })]
);

const metadata = {
  name: "ChainBlock",
  description: "ChainBlock lets you display your NFTs on a digital frame.",
  url: "https://chainblock.art",
  icons: ["/background.png"],
};

const _wcConnector = new WalletConnectConnector({
  chains,
  options: { projectId, showQrModal: false, metadata },
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [_wcConnector],
  publicClient,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  featuredWalletIds: [],
  includeWalletIds: [],
});

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
        </WagmiConfig>
      ) : null}
    </>
  );
}
