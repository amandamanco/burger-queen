import React from 'react';
import styled from 'styled-components';
import img from '../../assets/faixa.png';

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
  width: 6%;
  `;


const Container = styled.header`
  width: 100%;
  height: auto;
  display: flex;
  position: absolute;
  z-index: 1;
  justify-content: space-between;
  align-items: start;
  padding: 20px;
  background-color: none;
  @media (min-width: 320px) and (max-width: 500px){
    justify-content: space-around;
    align-items: center;
    margin: 0;
  }
`;

const Header = (props) => {
  return (
    <Container>
      <Img src={img} />
      <Bell src={props.bell} onClick={props.onClickBell} />
      {props.children}
    </Container>
  )
}

export default Header;