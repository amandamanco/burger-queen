import React from 'react';
import styled from 'styled-components';
import CheckImg from '../assets/check.png';
import Container from '../components/container/ContainerMenu.js';

const Check = styled.img`
  width: 36px;
  height: 36px;
`;

const Notification = (props) => {
  return (
    <Container justify="space-between" margin="0 0 24px 0" align="center">
      <Container width="80%" direction="column">
        <h4>Mesa {props.table} ({props.name})</h4>
        <p>{props.order}</p>
      </Container>
      <Check src={CheckImg} alt="Check" onClick={props.onClick} />
    </Container>
  )
}

export default Notification;