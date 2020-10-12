import React from "react";
import styled from "styled-components";
import COLORS from "../../COLORS";

const Header = () => {
  return (
    <Wrapper>
      You <Beat>Beat</Beat> Me To It !
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  color: white;
  font-size: 100px;
`;

const Beat = styled.span`
  color: ${COLORS.midnight};
  border-bottom: 5px solid ${COLORS.midnight};
`;

export default Header;
