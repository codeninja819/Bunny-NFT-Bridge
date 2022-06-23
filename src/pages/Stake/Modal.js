/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Box, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import { FiCheck } from "react-icons/fi";
import useBridgeInfo from "../../hooks/useBridgeInfo";
import { getNFTContract, getTokenContract } from "../../utils/contracts";
import { useAddress, useWeb3Context } from "../../hooks/web3Context";
import CONFIG from "../../abi/config.json";
import { useEffect, useState } from "react";
import { fetchBridgeById } from "../../action/bridge";

let timerid = null;
const Modal = ({
  open,
  setOpen,
  loading,
  setLoading,
  onConfirm,
  curProcessId,
  selectedNFTs,
}) => {
  const { allowance, nftallowance, fetchAllowance } = useBridgeInfo();
  const { chainID, provider } = useWeb3Context();
  const account = useAddress();
  const [text, setText] = useState("");

  const sm = useMediaQuery("(max-width : 550px)");

  async function fetchStatus() {
    try {
      let temp = "Initiating...";
      if (!curProcessId) {
        setText(temp);
        return;
      }
      const result = await fetchBridgeById(curProcessId);
      if (result.status === "Processing") temp = "Waiting for confirmation...";
      if (result.status === "done") {
        temp = "NFTs transfered";
      }
      setText(temp);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchStatus();
    if (timerid) clearInterval(timerid);
    timerid = setInterval(() => {
      fetchStatus();
    }, 3000);
  }, [curProcessId]);
  const onApproveContact = async () => {
    setLoading(true);
    try {
      const tokenContract = getTokenContract(chainID, provider.getSigner());
      const estimateGas = await tokenContract.estimateGas.approve(
        CONFIG.BRIDGE_CONTRACT[chainID],
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      );
      console.log(estimateGas.toString());
      const tx = {
        gasLimit: estimateGas.toString(),
      };
      const approvetx = await tokenContract.approve(
        CONFIG.BRIDGE_CONTRACT[chainID],
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        tx
      );
      await approvetx.wait();
      fetchAllowance();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onApproveNFT = async () => {
    setLoading(true);
    try {
      const nftContract = getNFTContract(chainID, provider.getSigner());
      console.log(account, CONFIG.BRIDGE_CONTRACT[chainID]);
      const estimateGas = await nftContract.estimateGas.setApprovalForAll(
        CONFIG.BRIDGE_CONTRACT[chainID],
        true
      );
      console.log(estimateGas.toString());
      const tx = {
        gasLimit: estimateGas.toString(),
      };
      const approvetx = await nftContract.setApprovalForAll(
        CONFIG.BRIDGE_CONTRACT[chainID],
        true,
        tx
      );
      await approvetx.wait();
      fetchAllowance();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <StyledContainer>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          maxWidth={sm ? "100%" : "85%"}
          mx={"auto"}
          mt={"20px"}
          position={"relative"}
        >
          <CircleBox active={true}>
            <Box>
              <Box>
                <FiCheck />
              </Box>
            </Box>
            <Box>Initiating</Box>
          </CircleBox>
          <CircleBox active={text !== "Initiating..."}>
            <Box>
              <Box>{text !== "Initiating..." ? <FiCheck /> : ""}</Box>
            </Box>
            <Box>Waiting for confirmation</Box>
          </CircleBox>
          <CircleBox active={text === "NFTs transfered"}>
            <Box>
              <Box>{text === "NFTs transfered" ? <FiCheck /> : ""}</Box>
            </Box>
            <Box>NFTs transferred</Box>
          </CircleBox>
          {text !== "Initiating..." ? (
            <Box
              width={"calc(100% - 200px)"}
              left={"100px"}
              height={"1px"}
              bgcolor={" rgba(255, 255, 255)"}
              position={"absolute"}
              top={"22px"}
            />
          ) : (
            ""
          )}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          mt={"50px"}
        >
          <Box
            fontSize={"30px"}
            fontWeight={"bold"}
            color={"#f1ac5d"}
            textAlign={"center"}
          >
            {text}
          </Box>
          <Box
            mt={"20px"}
            textAlign={"center"}
            color={"#f6e7c9"}
            lineHeight={"32px"}
            width={"fit-content"}
          >
            Sending NFTs from{" "}
            {chainID === 20 ? "ELASTOS Smart Chain" : "FUSION MAINNET"} to{" "}
            {chainID === 20 ? "FUSION MAINNET" : "ELASTOS Smart Chain"}
            <br />
            Please Wait a moment
          </Box>
          <Box mt={"40px"} width={"calc(100% - 100px)"}>
            <StyledButton
              type={"secondary"}
              onClick={() => {
                allowance
                  ? nftallowance
                    ? selectedNFTs.length
                      ? onConfirm()
                      : setOpen(false)
                    : onApproveNFT()
                  : onApproveContact();
              }}
              disabled={!account || loading}
            >
              {allowance
                ? nftallowance
                  ? selectedNFTs.length
                    ? "CONFIRM"
                    : "CLOSE"
                  : "APPROVE NFT"
                : "APPROVE"}
            </StyledButton>
          </Box>
        </Box>
      </StyledContainer>
    </Dialog>
  );
};

const StyledButton = styled.button`
  padding: 15px 30px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  background: ${({ type }) =>
    type === "secondary"
      ? "linear-gradient(to right, rgb(246, 100, 60) ,rgb(246, 100, 60), #043cb4, #0251b3)"
      : "linear-gradient(to right, #05d4f6c2 ,#05d4f6c2, #043cb4, #0251b3)"};
  background-size: 300% 100%;
  transition: all 0.3s ease-in-out;
  :hover {
    background-position: 100% 0;
  }
  color: white;
  border: none;
  width: 100%;
  transition: all 0.4s;
  :disabled {
    background: rgba(112, 125, 162, 0.3);
    color: rgb(189, 194, 196);
    cursor: not-allowed;
    border: none;
  }
`;

const CircleBox = styled(Box)`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div:nth-child(1) {
    > div {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${({ active }) =>
        active ? "rgb(63, 70, 211)" : "transparent"};
      border: ${({ active }) =>
        active ? "2px solid transparent" : "2px solid rgb(63, 70, 211)"};
      border-radius: 50%;
      color: white;
      font-size: 18px;
      :hover {
        background: rgb(158, 158, 158);
      }
    }
    width: 48px;
    height: 48px;
    background: transparent;
    position: relative;
    padding: 12px;
    z-index: 10;
  }
  > div:nth-child(2) {
    margin-top: 8px;
    font-size: 14px;
    text-align: center;
    text-shadow: 1px 1px 15px rgb(211 104 44 / 76%);
  }
`;

const StyledContainer = styled(Box)`
  padding: 30px 120px;
  border-radius: 24px;
  font-family: "Chakra Petch", sans-serif;
  color: #f6e7c9;
  @media screen and (max-width: 700px) {
    padding: 30px 50px;
  }
  @media screen and (max-width: 450px) {
    padding: 30px 10px;
  }
`;

export default Modal;
