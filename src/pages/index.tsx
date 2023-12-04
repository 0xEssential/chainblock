import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useAccount } from "wagmi";
import Display from "@/components/Display";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      <Head>
        <title>ChainBlock</title>
        <meta
          name="description"
          content="ChainBlock lets you display your NFTs on a digital frame."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className={styles.backdrop} />
        <div className={styles.header}></div>
      </header>
      <main className={styles.main}>
        {isConnected ? (
          <Display />
        ) : (
          <w3m-connecting-wc-view></w3m-connecting-wc-view>
        )}
      </main>
    </>
  );
}
