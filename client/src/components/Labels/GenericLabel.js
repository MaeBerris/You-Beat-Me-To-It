import React from "react";
import styled from "styled-components";

const GenericLabel = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  transform: skew(9deg);
  background: white;
  font-size: 40px;
  padding: 5px;
  display: flex;
  margin-bottom: 10px;
`;

const Content = styled.div`
  transform: skew(-9deg);
  font-weight: 700;
  color: black;
`;

export default GenericLabel;
