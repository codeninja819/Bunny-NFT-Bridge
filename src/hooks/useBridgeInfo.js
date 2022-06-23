/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAddress, useWeb3Context } from "./web3Context";
import {
  getBridgeContract,
  getNFTContract,
  getTokenContract,
} from "../utils/contracts";
import Config from "../abi/config.json";
import { ethers } from "ethers";

const defaultVal = {
  performanceFee: 0,
  allowance: false,
  nftallowance: false,
  fetchAllowance: () => {},
  fetchBridgeData: () => {},
};

export const BridgeInfoContext = React.createContext(defaultVal);

export default function useBridgeInfo() {
  return React.useContext(BridgeInfoContext);
}
let nftid = null,
  bridgeid = null;

export function BridgeInfoProvider({ children }) {
  const account = useAddress();
  const { chainID } = useWeb3Context();
  const [allowance, setAllowance] = useState(false);
  const [nftallowance, setNFTAllowance] = useState(false);
  const [performanceFee, setPerformanceFee] = useState(0);

  async function fetchAllowance() {
    try {
      const tokenContract = getTokenContract(chainID);
      const _allowance = await tokenContract.allowance(
        account,
        Config.BRIDGE_CONTRACT[chainID]
      );
      setAllowance(_allowance > ethers.utils.parseEther("100"));

      const nftContract = getNFTContract(chainID);
      const _nftallowance = await nftContract.isApprovedForAll(
        account,
        Config.BRIDGE_CONTRACT[chainID]
      );
      setNFTAllowance(_nftallowance);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchBridgeData() {
    try {
      const bridgeContract = getBridgeContract(chainID);
      const _performanceFee = await bridgeContract.performanceFee();

      setPerformanceFee(_performanceFee);
      console.log(_performanceFee.toString());
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!account) return;
    fetchAllowance();
    if (nftid) clearInterval(nftid);
    nftid = setInterval(function () {
      fetchAllowance();
    }, 20000);
  }, [account, chainID]);

  useEffect(() => {
    fetchBridgeData();
    if (bridgeid) clearInterval(bridgeid);
    bridgeid = setInterval(function () {
      fetchBridgeData();
    }, 20000);
  }, [chainID]);
  return (
    <BridgeInfoContext.Provider
      value={{
        allowance,
        nftallowance,
        performanceFee,
        fetchBridgeData,
        fetchAllowance,
      }}
      children={children}
    />
  );
}
