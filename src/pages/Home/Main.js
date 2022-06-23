/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { useAddress, useWeb3Context } from "../../hooks/web3Context";

const styleobj = {
  WebkitTransform:
    "translate3d(0, 100px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(3deg) skew(0, 0)",
  msTransform:
    "translate3d(0, 100px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(3deg) skew(0, 0)",
  transform:
    "translate3d(0, 100px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(3deg) skew(0, 0)",
  opacity: 0,
};

const Main = ({ setError, setErrMsg }) => {
  const account = useAddress();
  const { connect } = useWeb3Context();

  const connectWallet = () => {
    connect().then((msg) => {
      if (msg.type === "error") {
        setError(true);
        setErrMsg(
          `Contract is not deployed on current network. please choose Elastos network or Fusion network`
        );
      } else {
        setError(false);
      }
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        // addAccount({ id: accounts[0] })
        connectWallet();
      });
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    }
  }, [account]);

  return (
    <section className="stake-and-earn wf-section">
      <h2
        data-w-id="dd94e943-0d2f-0166-be77-07d29f9437fd"
        style={styleobj}
        className="main-title stake-title main-h2-customStyle"
      >
        NFT BRIDGE
      </h2>
      <div className="stake-content">
        <p
          data-w-id="f70c0a51-08da-0411-b870-daee4d757f7e"
          style={{ opacity: 0 }}
          className="typo-mint-content"
        >
          Don't have Bunny Punk NFTs to bridge?
        </p>
        <p
          data-w-id="f70c0a51-08da-0411-b870-daee4d757f7e"
          style={{ opacity: 0 }}
          className="typo-mint-content"
        >
          Buy them at these marketplaces
        </p>
        <div className="div-markets">
          <a
            href="https://ela.city/marketplace/collections/0xe27934fb3683872e35b8d9e57c30978e1260c614"
            target="_blank"
            className="button-nav-small middle w-inline-block"
            rel="noreferrer"
          >
            <img
              src="images/elacity.png"
              loading="lazy"
              alt="elacity favicon"
              className="image-social"
            />
          </a>
          <a
            href="https://pasarprotocol.io/collections/detail/0xE27934fB3683872e35b8d9E57c30978e1260c614"
            target="_blank"
            className="button-nav-small middle w-inline-block"
            rel="noreferrer"
          >
            <img
              src="images/pasar.svg"
              loading="lazy"
              alt="pasar favicon"
              className="image-social"
            />
          </a>
          <a
            href="https://esc.elastos.io/address/0x3e62FD5C58F15C421EF1E19FDd1492304e3dd19D/transactions"
            target="_blank"
            className="button-nav-small middle w-inline-block"
            rel="noreferrer"
          >
            <img
              src="images/elastos.svg"
              loading="lazy"
              alt="elastos favicon"
              className="image-social"
            />
          </a>
        </div>
        <a
          data-w-id="50077320-d150-c3b1-99d4-af4e6fb8fa39"
          style={{ opacity: 0 }}
          href="#"
          className="primary-button w-button"
          onClick={connectWallet}
        >
          CONNECT WALLET
        </a>
      </div>
    </section>
  );
};

export default Main;
