import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  // baseURL: "https://bridge-backend.vercel.app/",
});

export async function makeBridge(sender, tokenIds, chainID) {
  const result = await instance.post("/api/bridgeController/makeBridge", {
    sender,
    tokenIds,
    chainID,
  });
  return result.data.data;
}
export async function fetchBridgePending(sender, chainID) {
  const result = await instance.post(
    "/api/bridgeController/fetchBridgePending",
    { sender, chainID }
  );
  console.log(result.data);
  return result;
}

export async function withdrawNFTs(sender, chainID, tokenIds) {
  const result = await instance.post("/api/bridgeController/withdrawNFTs", {
    sender,
    chainID,
    tokenIds,
  });
  return result;
}

export async function fetchBridgeById(_id) {
  const result = await instance.post("/api/bridgeController/fetchBridgeById", {
    _id,
  });
  return result.data;
}
export async function cancelOrder(owner, nonce) {
  const result = await instance.post("/api/bridgeController/cancelOrder", {
    owner,
    nonce,
  });
  return result;
}
