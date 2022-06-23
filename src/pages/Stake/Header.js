/* eslint-disable jsx-a11y/anchor-is-valid */

import { useWeb3Context } from "../../hooks/web3Context";

const Header = () => {
  const { disconnect } = useWeb3Context();

  const onDisconnect = async () => {
    disconnect();
  };

  return (
    <>
      <div
        data-animation="default"
        data-collapse="medium"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="navbar-2 w-nav"
      >
        <div className="container nav w-container">
          <a href="index.html" className="brand w-nav-brand">
            <img
              src="images/bunny-punk-logo.svg"
              loading="lazy"
              width="115"
              alt="bunny punk logo"
            />
          </a>
          <div className="nav-left-holder">
            <div
              className="button-nav-big w-inline-block"
              style={{ cursor: "pointer" }}
              onClick={() => onDisconnect()}
            >
              <div className="typo-buysun">DISCONNECT WALLET</div>
            </div>
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
          <div className="nav-middle-holder">
            <a href="https://bunnypunk.io/" className="nav-links w-nav-link">
              Home
            </a>
            <a
              href="https://farm.bunnypunk.io/"
              target="_blank"
              className="nav-links w-nav-link"
              rel="noreferrer"
            >
              FARM
            </a>
            <a
              href="https://www.bunnypunk.io/litepaper"
              target="_blank"
              className="nav-links w-nav-link"
              rel="noreferrer"
            >
              LITEPAPER
            </a>
            <a
              href="https://snapshot.org/#/bunnypunk.eth"
              target="_blank"
              className="nav-links w-nav-link"
              rel="noreferrer"
            >
              GOVERNANCE
            </a>
          </div>
          <div
            data-w-id="734b1a8e-b06e-4071-ebd2-3c94b45ac66d"
            className="menu-button w-nav-button"
          >
            <img src="images/image---Menu-icon.svg" loading="lazy" alt="" />
            <img
              src="images/image-X.svg"
              loading="lazy"
              alt=""
              className="image-13"
            />
          </div>
          <nav role="navigation" className="nav-menu w-nav-menu">
            <div className="div-block-9">
              <a href="#" className="button-nav-big-mobile w-inline-block">
                <div className="image-star">
                  <img
                    src="images/glide-logo.svg"
                    loading="lazy"
                    alt="glide icon"
                  />
                </div>
                <div className="typo-buysun">$BUNNY</div>
              </a>
              <div className="nav-link-holder-mobile">
                <a
                  href="https://bunnypunk.io/"
                  className="nav-links w-nav-link"
                >
                  Home
                </a>
                <a
                  href="https://farm.bunnypunk.io/"
                  target="_blank"
                  className="nav-links w-nav-link"
                  rel="noreferrer"
                >
                  FARM
                </a>
                <a
                  href="https://www.bunnypunk.io/litepaper"
                  className="nav-links w-nav-link"
                >
                  LITEPAPER
                </a>
                <a
                  href="https://snapshot.org/#/bunnypunk.eth"
                  target="_blank"
                  className="nav-links w-nav-link"
                  rel="noreferrer"
                >
                  GOVERNANCE
                </a>
              </div>
              <div className="div-block-8">
                <p className="typo-nav-mobile">follow us and join the club</p>
                <div className="div-block-7">
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
              <p className="typo-nav-mobile">
                <span className="text-span-2">
                  PRIVACY POLICY — TERMS OF USE
                  <br />
                </span>
                ©2022 - Bunny Punk All rights reserved.
              </p>
            </div>
          </nav>
        </div>
      </div>
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
      <div className="section-background mint sticky"></div>
      <div style={{ display: "none" }} className="nav-overlay">
        <div className="nav-menu-wrapper">
          <a
            href="https://glidefinance.io/info/token/0x75740fc7058da148752ef8a9adfb73966deb42a8"
            target="_blank"
            className="button-nav-big-mobile w-inline-block"
            rel="noreferrer"
          >
            <div className="image-star">
              <img
                src="images/glide-logo.svg"
                loading="lazy"
                alt="glide icon"
                className="sun-logo"
              />
            </div>
            <div className="typo-buysun">$BUNNY</div>
          </a>
          <div className="mobile-link-holder">
            <a href="https://bunnypunk.io/" className="link-mobile-nav">
              Home
            </a>
            <a
              href="https://farm.bunnypunk.io/"
              target="_blank"
              className="link-mobile-nav"
              rel="noreferrer"
            >
              FARM
            </a>
            <a
              href="https://www.bunnypunk.io/litepaper"
              target="_blank"
              className="link-mobile-nav mid"
              rel="noreferrer"
            >
              LITEPAPER
            </a>
            <a
              href="https://snapshot.org/#/bunnypunk.eth"
              target="_blank"
              className="link-mobile-nav"
              rel="noreferrer"
            >
              GOVERNANCE
            </a>
            <div
              className="button-nav-big w-inline-block"
              style={{ cursor: "pointer", margin: "10px 0px", display: "flex" }}
              onClick={() => onDisconnect()}
            >
              <div className="typo-buysun">DISCONNECT WALLET</div>
            </div>
          </div>
          <div className="social-mobile-nav">
            <p className="typo-nav-mobile">FOLLOW US AND JOIN THE CLUB</p>
            <div className="social-buttons">
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
          <p className="typo-nav-mobile">
            ©2022 - Bunny Punk All rights reserved.
          </p>
        </div>
        <div className="background"></div>
      </div>
      <div className="nav-mobile">
        <a href="#" className="logo-link w-inline-block">
          <img
            src="images/bunny-punk-logo.svg"
            loading="lazy"
            alt="bunny punk logo"
          />
        </a>
        <div
          data-w-id="d82c271c-c7ca-0d55-ab3e-adddf2873813"
          className="hamburger-menu"
        >
          <img
            src="images/image-X.svg"
            loading="lazy"
            alt=""
            className="image-15"
          />
          <img
            src="images/image---Menu-icon.svg"
            loading="lazy"
            alt=""
            className="image-14"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
