import React from "react";
import styled from "styled-components";
import COLORS from "../../COLORS";

const Header = () => {
  return (
    <Wrapper>
      You <Beat>Beat</Beat> Me To It !
      <Shape />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  text-align: center;
  color: white;
  font-size: 100px;
  font-family: "Echizen";
  margin-top: 25px;
  text-shadow: 2px 2px 2px grey;
  line-height: 70%;
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
  transform: skew(9deg);
  padding: 0px 5px;
  color: white;
  text-shadow: 2px 2px 2px grey;
  /* border-bottom: 5px solid ${COLORS.midnight}; */
  font-family: "Echizen";
`;

const Shape = styled.div`
  width: 0;
  height: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-bottom: 250px solid #ff8519;
  position: absolute;
  z-index: -3;
  top: -25px;
  right: 40%;
`;

// const Beat = styled.span`
//   background: -webkit-linear-gradient(${COLORS.tertiary}, ${COLORS.secondary});
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-family: "Echizen";
// `;

export default Header;
