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

const Pending = ({ nfts, selectedPendingNFTs, setSelectedPendingNFTs }) => {
  const checkBoxClick = (e, tokenId) => {
    const imageDisplay = e.target.querySelector("img").style.display;
    if (imageDisplay !== "none") {
      e.target.querySelector("img").style.display = "none";
      setSelectedPendingNFTs([
        ...selectedPendingNFTs.filter((nft) => nft !== tokenId),
      ]);
    } else {
      e.target.querySelector("img").style.display = "block";
      setSelectedPendingNFTs([...selectedPendingNFTs, tokenId]);
    }
  };
  return (
    <div className="stake-nfts">
      {nfts &&
        nfts.map((nft, i) => {
          if (i < nfts.length - 1) {
            return (
              <div key={i} className="nft-row">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
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
                  <div className="nft-id" style={{ fontSize: "12px" }}>
                    {nft.date}
                  </div>
                </div>
                <div className="white-detail-line"></div>
              </div>
            );
          } else {
            return (
              <div key={i} className="nft-row last">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
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
                  <div className="nft-id" style={{ fontSize: "12px" }}>
                    {nft.date}
                  </div>
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
  );
};

export default Pending;
