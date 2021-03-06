import React from 'react';
import styled from 'styled-components';

const Cards = styled.div`
  text-align: center;
  width: 140px;
  height: auto;
  padding: 15px;
  margin: 8px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 6px 6px 7px -2px rgba(0,0,0,0.5);
  img {
    margin: 5px;
    width:80px;
    height: 80px;
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
      <figure>
        <img src={props.img} alt={props.alt}></img>
      </figure>
      <h4>{props.title}</h4>
      <p>{props.price}</p>
    </Cards>
  );
};

export default Menu;