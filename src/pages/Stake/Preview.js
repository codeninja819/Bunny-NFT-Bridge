import { Box, useMediaQuery } from "@mui/material";
import styled from "styled-components";

const Preview = ({ nfts }) => {
  const sm = useMediaQuery("(max-width : 600px)");
  return (
    <StyledContainer>
      {nfts.map((data, i) => {
        return (
          <PreviewItem>
            <Box
              display={"flex"}
              minWidth={"200px"}
              minHeight={"200px"}
              maxWidth={"200px"}
              maxHeight={"200px"}
            >
              <img
                src={data.data.image.replace(
                  "gateway.pinata.cloud",
                  "bunn.mypinata.cloud"
                )}
                alt={""}
                width={"100%"}
              />
            </Box>
            <Box
              ml={sm ? "0" : "30px"}
              maxWidth={"500px"}
              mt={sm ? "30px" : "0"}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                color={"rgb(241, 172, 93)"}
              >
                {data.data.name}
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                color={"rgb(241, 172, 93)"}
                fontSize={"12px"}
                mt={"10px"}
              >
                {data.data.description}
              </Box>
              <Property mt={"10px"}>
                {data.data.attributes.map((data, i) => {
                  return (
                    <Box key={i} textAlign={"center"}>
                      <Box color={"white"} fontSize={"10px"}>
                        {data.rait_type}
                      </Box>
                      <Box color={"rgb(241, 172, 93)"} fontSize={"12px"}>
                        {data.value}
                      </Box>
                    </Box>
                  );
                })}
              </Property>
            </Box>
          </PreviewItem>
        );
      })}
    </StyledContainer>
  );
};

const Property = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > div {
    border: 1px solid rgb(241, 172, 93);
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    width: 150px;
  }
  @media screen and (max-width: 600px) {
    justify-content: space-evenly;
  }
`;

const PreviewItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledContainer = styled(Box)`
  padding-top: 50px;
  padding-bottom: 180px;
`;

export default Preview;
