import React from 'react';
import styled from 'styled-components';
import Container from './container/ContainerMenu.js';

const Cards = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 140px;
  height: auto;
  padding: 6px;
  margin: 10px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 6px 6px 7px -2px rgba(0,0,0,0.5);
  img {
    margin: 5px;
    width:86px;
    height: 86px;
    border-radius: 50px;
  }
  @media (min-width: 320px) and (max-width: 500px) {
    font-size: 14px;
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const Menu = (props) => {
  return (

    <Cards onClick={props.onClick}>
      <Container direction="column" justify="center">
        <figure>
          <img src={props.img} alt={props.alt}></img>
        </figure>
        <Container direction="column" padding="8px 0">
          <h4>{props.title}</h4>
          <p>{props.price}</p>
        </Container>
      </Container>
    </Cards >
  );
};

export default Menu;