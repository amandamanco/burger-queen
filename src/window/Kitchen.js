
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../configs/FirebaseConfig.js';
import SignOut from '../configs/FirebaseSignOut';
import Container from '../components/container/ContainerMenu.js';
import Button from '../components/Button.js';
import Text from '../components/Text.js';
import styled from 'styled-components';
import LogoutImg from '../assets/logout.svg';

const Ancora = styled(Link)`
  text-decoration: none;
  color: #fff;
  border: 1.5px solid tomato;
  background-color: tomato;
  font-size: 20px;
  border-radius: 30px;
  padding: 10px 12px;
`;

const Logout = styled.img`
  width: 4%;
`;

const Kitchen = (props) => {

  const [order, setOrder] = useState([]);

  useEffect(() => {
    async function fireCall() {
      await firebase.firestore().collection('Orders').where("status", "==", "Encaminhado para a cozinha").onSnapshot((snapshot) => {
        const newOrder = snapshot.docs.map((doc) => {
          // const totalTime = (initial) => {
          //   const timeInitial = initial.toDate().getTime();
          //   const timeFinaly = finaly.toDate().getTime();
          //   const total = new Date(timeFinaly - timeInitial);
          //   return `${timeInitial.getMinutes()}:${timeInitial.getSeconds()}`;
          // }
          // const teste = totalTime(doc.data().date)
          // console.log(teste)
          if (doc.data().status === 'Encaminhado para a cozinha') {
            return ({
              id: doc.id,
              ...doc.data()
            });
          } else {
            return false
          };
        });
        setOrder(newOrder);
      });
    };
    fireCall();
  }, []);

  const resumeOrder = (order) => {
    let orderInfo = [];

    for (let itens in order) {
      const orders = order[itens].item;
      const extra = order[itens].extra;
      const info = order[itens].info;

      orderInfo.push(
        <Container direction="column" margin="8px 0">
          <h3>{orders}</h3>
          {info ? <p>Tipo de Hamburger: {info}</p> : null}
          {extra ? <p>Adicionais: {extra}</p> : null}
        </Container>
      );
    };
    return orderInfo;
  };

  const logout = (event) => {
    event.preventDefault();
    SignOut(props);
  }

  const updateOrder = (e, key) => {
    e.preventDefault();
    firebase.firestore().collection('Orders').doc(key)
      .update({ status: "Encaminhado para o salão" });
  };

  return (
    <Container direction="column" color="#E8E8E8" height="100%">
      <Container justify="space-between" align='baseline' color="#E8E8E8" margin="20px 20px 0 34px">
        <Ancora to="/Historic">Histórico de Pedidos</Ancora>
        <Logout
          src={LogoutImg}
          alt="Logout"
          onClick={logout}
        />
      </Container>
      <Container direction="column" color="#E8E8E8">
        {order.map((request) => (
          <Container
            key={request.id}
            justify="space-between"
            color="white"
            margin="3% 0"
            mediaAlign='center'
            maxMargin='3% 20%'
            padding="40px 20px 40px 40px"
            width="100%">
            <Container
              direction="column"
              mediaAlign='center'
              justify='center'
              align="flex-start"
              font='18px'>
              <Text align="flex-start" text={resumeOrder(request.order)}
                padding="0"
                margin="0" />
              {request.observation ? (
                <Text
                  color="#FF6347"
                  size="20px"
                  padding="16px 0 0 0"
                  margin="0"
                  text={"Observações: " + request.observation}>
                </Text>) : null}
            </Container>
            <Container direction="column" justify='center' align='center' width='340px'>
              <Text text={"Mesa: " + request.table}
                padding="0"
                margin="0" />
              <Text text={"Cliente: " + request.name}
                padding="0"
                margin="0" />
              <Text text={"Funcinário: " + request.worker}
                padding="0"
                margin="0" />
              <Button
                text="Pedido Pronto"
                onClick={(e) => updateOrder(e, request.id)}
                width="56%"
                height="50px"
                margin="32px 0 0 0" />
            </Container>
          </Container>
        ))}
      </Container>

    </Container>
  );
};

export default withRouter(Kitchen);
