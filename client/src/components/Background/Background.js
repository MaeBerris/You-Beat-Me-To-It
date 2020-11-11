import React from "react";
import styled from "styled-components";
import COLORS from "../../COLORS";
import { AiFillGithub } from "react-icons/ai";

const Background = ({ children }) => {
  return (
    <Wrapper>
      <Shape1></Shape1>
      <Shape2></Shape2>
      <Shape3></Shape3>
      <ChildWrapper>{children}</ChildWrapper>
      <Footer>
        © Mae Berris 2020{" "}
        <Link
          href="https://github.com/MaeBerris/You-Beat-Me-To-It"
          target="_blank"
        >
          <AiFillGithub size={20} />
        </Link>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.main};
  position: relative;
  overflow: hidden;
`;

const Shape1 = styled.div`
  width: 500px;
  height: 800px;
  border-radius: 50%;
  transform: rotate(20deg);
  position: absolute;
  top: -400px;
  left: -100px;
  background-color: ${COLORS.secondary};
`;

const Shape2 = styled.div`
  width: 500px;
  height: 500px;
  transform: rotate(55deg);
  position: absolute;
  bottom: -450px;
  right: 300px;
  background-color: ${COLORS.tertiary};
`;

const Shape3 = styled.div`
  border-bottom: 400px solid ${COLORS.midnight};
  border-left: 55px solid transparent;
  border-right: 55px solid transparent;
  height: 0px;
  width: 350px;
  position: absolute;
  right: -150px;
  top: 20%;
  transform: rotate(70deg);
`;

const ChildWrapper = styled.div`
  position: relative;
  z-index: 3;
  min-height: 100vh;
`;

const Footer = styled.div`
  position: absolute;
  color: white;
  right: 15px;
  bottom: 15px;
  font-size: 20px;
  z-index: 3;
`;

const Link = styled.a`
  color: white;
  cursor: pointer;
  text-decoration: none;
  margin-left: 5px;
`;
export default Background;
