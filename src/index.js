import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalProvider } from "./context/GlobalContext";
import { Web3ContextProvider } from "./hooks/web3Context";
import { NFTInfoProvider } from "./hooks/useFetchNFT";
import { BridgeInfoProvider } from "./hooks/useBridgeInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <Web3ContextProvider>
        <NFTInfoProvider>
          <BridgeInfoProvider>
            <App />
          </BridgeInfoProvider>
        </NFTInfoProvider>
      </Web3ContextProvider>
    </GlobalProvider>
  </React.StrictMode>
);
