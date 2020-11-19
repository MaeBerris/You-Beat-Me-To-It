import React from "react";
import styled from "styled-components";
import COLORS from "../../COLORS";

const Header = () => {
  return (
    <Wrapper href={"https://you-beat-me-to-it.netlify.app"}>
      You <Beat>Beat</Beat> Me To It !
      <Shape />
    </Wrapper>
  );
};

const Wrapper = styled.a`
  display: block;
  text-decoration: none;
  position: relative;
  text-align: center;
  width: fit-content;
  color: white;
  font-size: 100px;
  font-family: "Echizen";
  margin: 0 auto;
  margin-top: 25px;
  margin-bottom: 50px;
  text-shadow: 2px 2px 0px ${COLORS.midnight};
  line-height: 70%;
  cursor: pointer;
`;

const Beat = styled.div`
  /* background: linear-gradient(
    to right,
    ${COLORS.tertiary},
    ${COLORS.secondary}
  ); */
  display: block;
  width: fit-content;
  margin: 0 auto;
  /* transform: skew(9deg); */
  padding: 0px 5px;
  color: ${COLORS.midnight};
  text-shadow: 2px 2px 0px white;
  /* border-bottom: 5px solid ${COLORS.midnight}; */
  font-family: "Echizen";
`;

const Shape = styled.div`
  width: 0;
  height: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-bottom: 250px solid #ff33be;
  /* border-bottom: 250px solid ${COLORS.tertiary}; */
  position: absolute;
  z-index: -3;
  top: -20px;
  left: -20px;
`;

// const Beat = styled.span`
//   background: -webkit-linear-gradient(${COLORS.tertiary}, ${COLORS.secondary});
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-family: "Echizen";
// `;

export default Header;
