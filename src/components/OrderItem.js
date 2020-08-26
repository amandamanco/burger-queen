import React from 'react';
import styled from 'styled-components';
import Delete from '../assets/delete.svg';
import Container from '../components/container/ContainerMenu.js';

const Trash = styled.img`
  width: 16%;
`;

const OrderItem = (props) => {
  return (
    <Container justify="row" width="80%" padding="4px" margin="12px">
      <Container direction="column" justify="flex-start" width="70%">
        <h4>{props.title}</h4>
        <h5>{props.info}</h5>
        <h5>{props.extra}</h5>
        <p>{props.price}</p>
      </Container>
      <Container justify="flex-end" width="100%">
        <Trash
          src={Delete}
          alt="Deletar item"
          onClick={props.onClick}
        />
      </Container>
    </Container>
  );
};

export default OrderItem;