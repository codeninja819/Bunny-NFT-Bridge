/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAddress, useWeb3Context } from "./web3Context";
import { getNFTContract } from "../utils/contracts";
import axios from "axios";
import { fetchBridgePending } from "../action/bridge";

const defaultVal = {
  nfts: [],
  pendingnfts: [],
  fetchPendingNFTs: () => {},
  fetchNFTs: () => {},
};

export const NFTInfoContext = React.createContext(defaultVal);

export default function useNFTInfo() {
  return React.useContext(NFTInfoContext);
}
let nftid = null;

export function NFTInfoProvider({ children }) {
  const account = useAddress();
  const { chainID } = useWeb3Context();
  const [nfts, setNFTs] = useState([]);
  const [pendingnfts, setPendingNFTs] = useState([]);

  async function fetchNFTs() {
    try {
      const nftContract = getNFTContract(chainID);
      const ownedNFTs = await nftContract.walletOfOwner(account);
      console.log(ownedNFTs);
      let temp = [];
      for (let i = 0; i < ownedNFTs.length; i++) {
        const result = await axios.get(
          `https://bunn.mypinata.cloud/ipfs/QmU7FNsvsN4x9J4hKU81V67vUjvK3iz7Z4aa4xJrR2i9Z6/Solana_Data_${Number(
            ownedNFTs[i]
          )}.json`
        );
        temp.push({
          data: result.data,
          tokenId: ownedNFTs[i].toString(),
        });
      }
      console.log(temp);
      setNFTs(temp);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPendingNFTs() {
    try {
      console.log(account, chainID);
      let result = await fetchBridgePending(account, chainID);
      result = result.data;
      let temp = [];
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].tokenIds.length; j++) {
          console.log(result[i].tokenIds[j].status);
          if (result[i].tokenIds[j].status !== "Pending") continue;
          const r = await axios.get(
            `https://bunn.mypinata.cloud/ipfs/QmU7FNsvsN4x9J4hKU81V67vUjvK3iz7Z4aa4xJrR2i9Z6/Solana_Data_${Number(
              result[i].tokenIds[j].id
            )}.json`
          );
          const created = new Date(result[i].created);
          temp.push({
            data: r.data,
            tokenId: result[i].tokenIds[j].id.toString(),
            date:
              created.toLocaleDateString() + " " + created.toLocaleTimeString(),
          });
        }
      }
      console.log(temp);
      setPendingNFTs(temp);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!account) return;
    fetchNFTs();
    fetchPendingNFTs();
    if (nftid) clearInterval(nftid);
    nftid = setInterval(function () {
      fetchNFTs();
      fetchPendingNFTs();
    }, 20000);
  }, [account, chainID]);

  return (
    <NFTInfoContext.Provider
      value={{ nfts, pendingnfts, fetchNFTs, fetchPendingNFTs }}
      children={children}
    />
  );
}
