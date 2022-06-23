const FooterComponent = () => {
  return (
    <>
      <footer
        data-w-id="211ac871-0edb-5c92-fccb-95dc2336d4ad"
        style={{ opacity: 0 }}
        className="footer wf-section"
      >
        <div className="container footer-mobile w-container">
          <div className="footer-madeby mobile">
            <p className="typo-footer dark">DAPP BY</p>
            <a
              href="https://www.bunnypunk.io"
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
            <div className="footer-link-holder">
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
                href="https://t.me/bunnypunkchat"
                target="_blank"
                className="button-nav-small middle w-inline-block"
                rel="noreferrer"
              >
                <img
                  src="images/Vector.svg"
                  loading="lazy"
                  alt="Telegram link button icon"
                  className="image-social"
                />
              </a>
              <a
                href="https://twitter.com/bunny_punk_nft"
                target="_blank"
                className="button-nav-small middle w-inline-block"
                rel="noreferrer"
              >
                <img
                  src="images/Twitter.svg"
                  loading="lazy"
                  alt="Twitter link button icon"
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
      <div className="background mint">
        <img
          src="images/lighning.png"
          loading="lazy"
          alt=""
          className="image-lightning _2"
        />
        <img
          src="images/image-lightning.png"
          loading="lazy"
          alt=""
          className="image-lightning"
        />
        <img
          src="images/castle.png"
          loading="lazy"
          sizes="100vw"
          srcSet="images/castle-p-500.png 500w, images/castle-p-800.png 800w, images/castle-p-1080.png 1080w, images/castle.png 1441w"
          alt=""
          className="castle-image"
        />
      </div>
    </>
  );
};

export default FooterComponent;
