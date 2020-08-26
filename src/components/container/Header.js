import React from 'react';
import styled from 'styled-components';
import img from '../../assets/faixa.png';
import Container from '../container/ContainerMenu.js';

const Img = styled.img`
  width: 65%;
  padding: 0 0 10px 0;
  @media (min-width: 320px) and (max-width: 500px) {
    width: 80%;
    height: auto;
    margin: 0;
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
    width: 40%;
    height: auto;
    margin: 0 0 0 12%;
  }
`;

const Bell = styled.img`
  width: 5%;
  margin: 0 14% 0 0;
  `;

const Header = (props) => {
  return (
    <Container
      width="100%"
      position="absolute"
      zindex="1"
      justify="space-between"
      align="start"
      padding="20px"
      mediaJustify="space-around"
      mediaAlign="center"
      mediaMargin="0">
      <Img src={img} />
      <Bell src={props.bell} onClick={props.onClickBell} />
      {props.children}
    </Container>
  )
}

export default Header;