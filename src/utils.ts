export const replaceIpfsUri = (data: string) => {
  return data.replace(/ipfs:\/\/(?:ipfs\/)?(.*)/, "https://ipfs.io/ipfs/$1");
};
