"use client";

import { useState } from "react";
import { NFTCard } from "./components";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>();
  const [collectionAddress, setCollectionAddress] = useState<string | null>();
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNFTs = async () => {
    const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM";
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    const requestOptions = {
      method: "GET",
    };
    let fetchURL = `${baseURL}?owner=${walletAddress}`;

    const searchOnlyByWallet = !collectionAddress?.length;
    if (!searchOnlyByWallet) {
      fetchURL = `${fetchURL}&contractAddresses%5B%5D=${collectionAddress}`;
    }

    const nfts = await fetch(fetchURL, requestOptions).then((data) =>
      data.json()
    );

    if (nfts) {
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collectionAddress?.length) {
      const requestOptions = {
        method: "GET",
      };
      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM";
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };

  const handleSearch = () => {
    if (fetchForCollection) {
      fetchNFTsForCollection();
    } else fetchNFTs();
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <input
            className="border-2 border-solid border-black rounded-sm"
            onChange={(e) => setWalletAddress(e.target.value)}
            value={walletAddress ?? ""}
            type="text"
            placeholder="Add your wallet address"
          />
          <input
            className="border-2 border-solid border-black rounded-sm"
            onChange={(e) => setCollectionAddress(e.target.value)}
            value={collectionAddress ?? ""}
            type="text"
            placeholder="Add the collection address"
          />
          <label>
            <input type="checkbox" />
          </label>
          <button
            className={
              "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
            }
            onClick={handleSearch}
          >
            Let s go!
          </button>
          <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
            {NFTs?.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
