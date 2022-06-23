import { ethers } from "ethers";
import Config from "../abi/config.json";
import NFTABI from "../abi/nft.json";
import BridgeABI from "../abi/bridge.json";
import ERC20ABI from "../abi/erc20.json";

export const RPC_ENDPOINT = {
  20: "https://rpc.glidefinance.io/",
  32659: "https://mainnet.anyswap.exchange",
  97: "https://data-seed-prebsc-1-s3.binance.org:8545",
  4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
};

export const getContract = (abi, address, chainID, signer) => {
  const simpleRpcProvider = new ethers.providers.JsonRpcProvider(
    RPC_ENDPOINT[chainID]
  );
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getTokenContract = (chainID, signer) => {
  return getContract(ERC20ABI, Config.FEETOKEN[chainID], chainID, signer);
};

export const getNFTContract = (chainID, signer) => {
  return getContract(
    NFTABI[chainID],
    Config.NFT_CONTRACT[chainID],
    chainID,
    signer
  );
};

export const getBridgeContract = (chainID, signer) => {
  return getContract(
    BridgeABI[chainID],
    Config.BRIDGE_CONTRACT[chainID],
    chainID,
    signer
  );
};
