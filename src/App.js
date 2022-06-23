import { useEffect, useState } from "react";
import Homepage from "./pages/Home";
import StakePage from "./pages/Stake";

import AlertBox from "./components/AlertBox/AlertBox";
import { useAddress } from "./hooks/web3Context";
import "./App.css";

function App() {
  const account = useAddress();
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("ix2").init();
    document.dispatchEvent(new Event("readystatechange"));
  });

  useEffect(() => {
    console.log(account);
  }, [account]);

  return (
    <>
      {account ? (
        <StakePage setError={setError} setErrMsg={setErrMsg} />
      ) : (
        <Homepage setError={setError} setErrMsg={setErrMsg} />
      )}

      {error && <AlertBox msg={errMsg} />}
    </>
  );
}
//
export default App;
