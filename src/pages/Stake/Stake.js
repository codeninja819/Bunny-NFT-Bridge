/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import { useState } from "react";
import useFetchNFT from "../../hooks/useFetchNFT";
import LoadingComponent from "../../components/LoadingComponent";
import { useAddress, useWeb3Context } from "../../hooks/web3Context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Preview from "./Preview";
import Modal from "./Modal";
import Pending from "./Pending";
import { getBridgeContract } from "../../utils/contracts";
import useBridgeInfo from "../../hooks/useBridgeInfo";
import { withdrawNFTs, makeBridge } from "../../action/bridge";

const MySwal = withReactContent(Swal);

const style1 = {
  WebkitTransform:
    "translate3d(0, 100px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(3deg) skew(0, 0)",
  MozTransform:
    "translate3d(0, 100px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(3deg) skew(0, 0)",
  msTransform:
    "translate3d(0, 100px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(3deg) skew(0, 0)",
  transform:
    "translate3d(0, 100px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(3deg) skew(0, 0)",
  opacity: 0,
};

const style2 = {
  WebkitTransform:
    "translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0deg) rotateZ(0) skew(0, 0)",
  MozTransform:
    "translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0deg) rotateZ(0) skew(0, 0)",
  msTransform:
    "translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0deg) rotateZ(0) skew(0, 0)",
  transform:
    "translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0deg) rotateZ(0) skew(0, 0)",
  transformStyle: "preserve-3d",
  opacity: 1,
};

const Stake = () => {
  const account = useAddress();
  const { provider, chainID } = useWeb3Context();
  const { nfts, pendingnfts, fetchPendingNFTs, fetchNFTs } = useFetchNFT();
  const { performanceFee } = useBridgeInfo();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const [selectedPendingNFTs, setSelectedPendingNFTs] = useState([]);
  const [curProcessId, setCurProcessId] = useState(null);

  const checkBoxClick = (e, tokenId) => {
    console.log(tokenId);
    const imageDisplay = e.target.querySelector("img").style.display;
    if (imageDisplay !== "none") {
      e.target.querySelector("img").style.display = "none";
      setSelectedNFTs([...selectedNFTs.filter((nft) => nft !== tokenId)]);
    } else {
      e.target.querySelector("img").style.display = "block";
      setSelectedNFTs([...selectedNFTs, tokenId]);
    }
  };

  const clearCheckboxes = () => {
    Array.from(
      document.querySelector(".stake-nfts").querySelectorAll("img.image-tick")
    ).map((item) => {
      item.style.display = "none";
    });
  };

  const onConfirm = async () => {
    setLoading(true);
    try {
      const bridgeContract = getBridgeContract(chainID, provider.getSigner());

      const estimateGas = await bridgeContract.estimateGas.deposit(
        selectedNFTs,
        { value: performanceFee }
      );
      console.log(estimateGas.toString());
      const tx = {
        gasLimit: estimateGas.toString(),
        value: performanceFee,
      };
      const ttx = await bridgeContract.deposit(selectedNFTs, tx);
      await ttx.wait();
      setSelectedNFTs([]);
      clearCheckboxes();
      const result = await makeBridge(account, selectedNFTs, chainID);
      console.log(result);
      setCurProcessId(result._id);
      fetchNFTs();
      fetchPendingNFTs();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onWithdrawNFTs = async () => {
    setLoading(true);
    if (!selectedPendingNFTs.length) {
      MySwal.fire({
        position: "top-end",
        title: "Error!",
        text: "No nft selected to stake",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      // alert('no nft selected to stake')
      setLoading(false);
      return;
    }
    try {
      console.log(selectedPendingNFTs);
      const bridgeContract = getBridgeContract(chainID, provider.getSigner());
      const estimateGas = await bridgeContract.estimateGas.withdraw(
        selectedPendingNFTs,
        account,
        account
      );
      console.log(estimateGas.toString());
      const tx = {
        gasLimit: estimateGas.toString(),
      };
      const ttx = await bridgeContract.withdraw(
        selectedPendingNFTs,
        account,
        account,
        tx
      );
      await ttx.wait();
      clearCheckboxes();
      setSelectedPendingNFTs([]);
      await withdrawNFTs(account, chainID, selectedPendingNFTs);
      fetchNFTs();
      fetchPendingNFTs();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        setLoading={setLoading}
        loading={loading}
        selectedNFTs={selectedNFTs}
        onConfirm={onConfirm}
        curProcessId={curProcessId}
      />
      {loading && <LoadingComponent />}
      <section className="stake-and-earn-connected wf-section">
        <h2
          data-w-id="638e3a75-1253-8367-0636-0a1cb9fe5d04"
          style={style1}
          className="main-title connected"
        >
          NFT BRIDGE
        </h2>
        <div
          data-w-id="584c57f4-5178-0bf2-1a84-17853597b257"
          style={{ opacity: 0 }}
          className="tabs-holder"
        >
          <div
            className={`stake-tabs ${page === 1 ? "mynfts" : "stakes-tab"}`}
            onClick={() => {
              setPage(1);
              setSelectedNFTs([]);
              setSelectedPendingNFTs([]);
            }}
          >
            my nfts
          </div>
          <div
            className={`stake-tabs ${page === 2 ? "mynfts" : "stakes-tab"}`}
            onClick={() => {
              setSelectedNFTs([]);
              setSelectedPendingNFTs([]);
              setPage(2);
            }}
          >
            preview
          </div>
          <div
            className={`stake-tabs ${page === 3 ? "mynfts" : "stakes-tab"}`}
            onClick={() => {
              setSelectedNFTs([]);
              setSelectedPendingNFTs([]);
              setPage(3);
            }}
          >
            pending
          </div>
        </div>
        {page === 1 ? (
          <div className="stake-nfts">
            {nfts &&
              nfts.map((nft, i) => {
                if (i < nfts.length - 1) {
                  return (
                    <div key={i} className="nft-row">
                      <div className="div-row-fit">
                        <div
                          className="check-box-holder"
                          onClick={(e) => checkBoxClick(e, nft.tokenId)}
                        >
                          <img
                            src="images/tick.svg"
                            style={{ pointerEvents: "none", display: "none" }}
                            loading="lazy"
                            alt=""
                            className="image-tick"
                          />
                        </div>
                        <div className="nft-image">
                          <img
                            src={nft.data.image.replace(
                              "gateway.pinata.cloud",
                              "bunn.mypinata.cloud"
                            )}
                            loading="lazy"
                            style={style2}
                            alt=""
                            className="image-nft-stake"
                          />
                        </div>
                        <div className="nft-id">{nft.data.name}</div>
                      </div>
                      <div className="white-detail-line"></div>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className="nft-row last">
                      <div className="div-row-fit">
                        <div
                          className="check-box-holder"
                          onClick={(e) => checkBoxClick(e, nft.tokenId)}
                        >
                          <img
                            src="images/tick.svg"
                            style={{ pointerEvents: "none", display: "none" }}
                            loading="lazy"
                            alt=""
                            className="image-tick"
                          />
                        </div>
                        <div className="nft-image">
                          <img
                            src={nft.data.image.replace(
                              "gateway.pinata.cloud",
                              "bunn.mypinata.cloud"
                            )}
                            loading="lazy"
                            width="76"
                            alt=""
                          />
                        </div>
                        <div className="nft-id">{nft.data.name}</div>
                      </div>
                      <div className="white-detail-line"></div>
                      <div className="white-detail-line bottom"></div>
                    </div>
                  );
                }
              })}
            {!nfts || (nfts && !nfts.length) ? (
              <div className="nft-row last">
                <p className="tw-text-white tw-mt-4">No Nfts in the wallet</p>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : page === 2 ? (
          <Preview nfts={nfts} />
        ) : (
          <Pending
            nfts={pendingnfts}
            setSelectedPendingNFTs={setSelectedPendingNFTs}
            selectedPendingNFTs={selectedPendingNFTs}
          />
        )}
      </section>
      <footer
        data-w-id="1c6363c1-60a3-5681-8671-51603099bdca"
        style={{ opacity: 0 }}
        className="footer stake wf-section"
      >
        <div className="stake-period-holder">
          <div className="hero-line left"></div>

          <a
            data-w-id="e2b7a820-35a6-06f6-ec66-f0b4a902d6fc"
            href="#"
            className="button-stake w-button"
            onClick={() => {
              if (page === 3) {
                onWithdrawNFTs();
                return;
              }

              if (!selectedNFTs.length) {
                MySwal.fire({
                  position: "top-end",
                  title: "Error!",
                  text: "No nft selected to stake",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 1500,
                });
                // alert('no nft selected to stake')
                setLoading(false);
                return;
              }
              if (page === 1) setOpen(true);
            }}
          >
            {page === 1 ? "BRIDGE NFTS" : page === 3 ? "WITHDRAW NFTS" : ""}
          </a>
          <div className="hero-line"></div>
        </div>
        <div className="container footer-mobile w-container">
          <div className="footer-madeby mobile">
            <p className="typo-footer dark">DAPP BY</p>
            <a
              href="http://www.bunnypunk.io/"
              className="typo-footer footer-link"
            >
              Bunny Punk
            </a>
            <p className="typo-footer dark">POWERED BY</p>
            <a
              href="https://www.elastos.info"
              className="typo-footer footer-link"
            >
              ELASTOS
            </a>
          </div>
          <div className="footer-copyright">
            <p className="typo-footer hidden">PRIVACY POLICY — TERMS OF USE</p>
            <p className="typo-footer dark">
              ©2022 - Bunny Punk
              <br />
              All rights reserved.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-link-holder"></div>
          </div>
          <div className="footer-madeby">
            <p className="typo-footer dark">DAPP BY</p>
            <a
              href="http://www.bunnypunk.io/"
              target="_blank"
              className="footer-link typo-footer"
              rel="noreferrer"
            >
              Bunny Punk
            </a>
            <p className="typo-footer dark">POWERED BY</p>
            <a
              href="https://www.elastos.info"
              className="typo-footer footer-link"
            >
              ELASTOS
            </a>
          </div>
        </div>
      </footer>
      <div className="stake-period-holder mobile">
        <div className="hero-line left"></div>
        <a
          data-w-id="e7892a29-86dd-8960-fe68-2193ff2d4865"
          href="#"
          className="button-stake w-button"
          onClick={() => {
            if (page === 3) {
              onWithdrawNFTs();
              return;
            }

            if (!selectedNFTs.length) {
              MySwal.fire({
                position: "top-end",
                title: "Error!",
                text: "No nft selected to stake",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
              });
              // alert('no nft selected to stake')
              setLoading(false);
              return;
            }
            if (page === 1) setOpen(true);
          }}
        >
          {page === 1 ? "BRIDGE NFTS" : page === 3 ? "WITHDRAW NFTS" : ""}
        </a>
        <div className="hero-line"></div>
      </div>
      <div className="footer-madeby mobile">
        <p className="typo-footer dark">DAPP BY</p>
        <a href="http://www.bunnypunk.io/" className="typo-footer footer-link">
          Bunny Punk
        </a>
        <p className="typo-footer dark">POWERED BY</p>
        <a href="https://www.elastos.info" className="typo-footer footer-link">
          ELASTOS
        </a>
      </div>
    </>
  );
};

export default Stake;
