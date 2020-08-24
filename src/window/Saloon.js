import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../configs/FirebaseConfig.js';
import styled from 'styled-components';
import Container from '../components/container/ContainerMenu.js';
import Err from '../components/Alert.js';
import Note from '../components/InputInfo.js';
import Text from '../components/Text.js';
import Button from '../components/Button.js';
import ResumeOrder from '../components/ResumeOrder.js';
import Menu from '../components/Menu.js';
import Background from '../assets/background02.png';
import Item from '../components/OrderItem.js';
import SignOut from '../configs/FirebaseSignOut';
import Modal from '../components/Modal';
import Header from '../components/container/Header';
import BellNotNotified from '../assets/bell.svg';
import BellNotified from '../assets/bell-notification.svg';
import Notification from '../components/Notification';
import LogoutImg from '../assets/logout.svg';

const Logout = styled.img`
  width: 4%;
`;

const Saloon = (props) => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [finalOrder, setFinalOrder] = useState({ table: "", name: "" });
  const [typeOrder, setTypeOrder] = useState("lunch");
  const [alert, setAlert] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [burger, setBurger] = useState({});
  const [burgerInfo, setBurgerInfo] = useState('');
  const [extra, setExtra] = useState('')
  const [err, setErr] = useState('');
  const [bell, setBell] = useState(BellNotified)
  const [window, setWindow] = useState(false);
  const [readyOrders, setReadyOrders] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('Menu').onSnapshot((snapshot) => {
      const newMenu = snapshot.docs.map((doc) => ({ ...doc.data() }))
      setMenu(newMenu)
    })
  }, []);

  useEffect(() => {
    firebase.firestore().collection('Orders').get().then((snapshot) => {
      const orders = snapshot.docs.map((doc) => {
        if (doc.data().status === 'Encaminhado para o salão') {
          return ({
            id: doc.id,
            ...doc.data()
          })
        } else {
          return false
        }
      })
      setReadyOrders(orders.filter(elem => elem !== false))
    })
  }, [bell])

  useEffect(() => {
    const timer = setTimeout(() => { setAlert(''); setErr('') }, 3000);
    return () => clearTimeout(timer);
  }, [alert, err]);

  const changeBell = () => {
    if (bell === BellNotified) {
      setBell(BellNotNotified);
      setWindow(true);
    } else {
      setBell(BellNotified)
      setWindow(false);
    }
  }

  const logout = (event) => {
    event.preventDefault();
    SignOut(props);
  }

  const clickMenuItem = (e, price, item) => {
    e.preventDefault();
    if (item.slice(0, 10) === 'Hamburguer') {
      setModalIsOpen(true)
      setBurger({ price, item })
    } else {
      setOrder([...order, { price, item }]);
    }
  }

  const burgerOrder = (e) => {
    e.preventDefault();
    let price = burger.price;
    if (extra !== ' Nenhum') {
      price = burger.price + 1;
    }
    setOrder([...order, {
      price: price,
      item: burger.item,
      info: burgerInfo,
      extra: extra,
    }]);
    setModalIsOpen(false);
    setBurgerInfo('');
    setExtra('');
  }

  const sendOrder = (e) => {
    e.preventDefault();
    const nameOrder = finalOrder.name;
    const tableOrder = finalOrder.table;

    if (nameOrder === "" || tableOrder === "") {
      setErr("Preencha o nº da mesa e o nome do cliente!")
    } else if (order.length === 0) {
      setErr("Sua comanda esta vazia. Adicione itens!")
    } else {
      const user = firebase.auth().currentUser.email;
      firebase.firestore().collection('Orders').doc().set({

        table: finalOrder.table,
        name: finalOrder.name,
        order: order,
        observation: finalOrder.obs ? finalOrder.obs : '',
        price: total(order),
        status: "Encaminhado para a cozinha",
        worker: user,
        date: new Date(),
      })
        .then(() => {
          setFinalOrder({ table: "", name: "", obs: "" });
          setOrder([]);
          setAlert("Pedido enviado para a cozinha!");
        });
    };
  };

  const delivered = (event, id, key) => {
    event.preventDefault();
    readyOrders.splice(key, 1);
    setReadyOrders([...readyOrders]);
    return firebase.firestore().collection('Orders').doc(id).update({
      status: 'Pedido concluído!'
    })
  }

  const deleteItem = (e, key) => {
    e.preventDefault();
    order.splice(key, 1);
    setOrder([...order]);
  }

  const total = (arr) => {
    const sum = arr.reduce((init, item) => init + item.price, 0);
    return sum;
  }

  const filterBreakfast = menu.filter((breakfast) => {
    return breakfast.type === "Café da Manhã";
  });
  const filterLunch = menu.filter((lunch) => {
    return lunch.type === "Menu Principal";
  });

  const filterMenu = (e, type) => {
    e.preventDefault();
    setTypeOrder(type);
  };

  return (
    <Container direction='column' height="100vh">
      <Header bell={bell} onClickBell={changeBell}>
        <Logout
          src={LogoutImg}
          alt="Logout"
          onClick={logout}
        />
      </Header>
      {window ?
        (<Container
          direction='column'
          position='absolute'
          zindex='20'
          overflow="scroll"
          color='white'
          margin='8% 0 0 0'
          mediaMargin='25% 0 0 0'
          maxMargin='6% 0 0 0'
          padding='3%'
          shadow='2px 2px 7px 1px rgba(0,0,0,0.2)'
          radius='5%'
          right='1%'
          width='34%'
          height='50%'>
          {readyOrders.map((elem, index) => (<Notification key={elem.id} table={elem.table} name={elem.name} order={elem.order.map(i => (`${i.item}, `))} onClick={(e) => delivered(e, elem.id, index)} />))}
        </Container>) : null}
      <Container direction='row' height='100%' mediaMargin='0'>
        <Container direction="column"
          width="70%" height='100%'
          aling="center"
          background={Background}
          mediaWidth='100%'
          mediaMargin='0'>
          <Container
            direction="row"
            justify="center"
            margin='28% 0 0 0'
            mediaMargin='30% 0 0 0'
            maxMargin='20% 0 0 0'
            mediaDirection='row'
            mediaJustify='space-evenly'>
            <Button
              onClick={(e) => filterMenu(e, "breakfast")}
              text="Café da Manhã"
              color="white"
              margin="12px 28px 12px 12px"
              background="#0AA7E2"
              height="80%"
              width="36%"
              font="22px" />
            <Button
              onClick={(e) => filterMenu(e, "lunch")}
              text="Menu Principal"
              color="white"
              margin="12px 28px 12px 12px"
              background="#0AA7E2"
              height="80%"
              width="36%"
              font="22px" />
          </Container>
          <Container
            direction="row"
            wrap="wrap"
            justify="center"
            padding="14px 0 0 0"
            margin="28px 0"
            mediaDirection='row'>
            {typeOrder === "breakfast" ? filterBreakfast.map(elem => (
              <Menu
                key={elem.item}
                img={elem.img}
                alt={elem.item}
                title={elem.item}
                price={`${elem.price} R$`}
                onClick={(event) => clickMenuItem(event, elem.price, elem.item)}
              />
            )) : filterLunch.map(elem => (
              <Menu
                key={elem.item}
                img={elem.img}
                alt={elem.item}
                title={elem.item}
                price={`R$ ${elem.price}`}
                onClick={(event) => clickMenuItem(event, elem.price, elem.item)}
              />
            ))}
          </Container>
          {modalIsOpen ? (
            <Modal
              onClose={() => setModalIsOpen(false)}
              onChangeBurger={(e) => setBurgerInfo(e.target.value)}
              onChangeExtra={(e) => setExtra(e.target.value)}
              onClick={burgerOrder}
            />
          ) : null}
        </Container>
        <Container direction="column" height="auto" width="36%" margin='8% 0 0 0' mediaAlign='center'>
          <ResumeOrder>
            <Container direction="column" margin="8% 0 10% 0" maxMargin='30% 0 0 0' mediaMargin='10% 0 5% 0'>
              <Container
                direction="row"
                justify="center"
                width="100% "
                margin="0 0 6px 0"
                mediaDirection='row'
                mediaJustify='center'>
                <Text size="28px" padding="0" margin="4px 4px 4px 6px" text="Mesa:" />
                <Note
                  onChange={(e) => setFinalOrder({ ...finalOrder, table: e.target.value })}
                  value={finalOrder.table}
                  width='40%'
                  height='32px'
                  required
                />
              </Container>
              <Container direction="row" justify="center" mediaDirection='row' mediaJustify='center'>
                <Text size="28px" padding="0" margin="4px" text="Nome:" />
                <Note
                  onChange={(e) => setFinalOrder({ ...finalOrder, name: e.target.value })}
                  value={finalOrder.name}
                  width="40%"
                  height="32px"
                  required
                />
              </Container>
            </Container>
            <Container direction="row" justify="center">
              <Text size="24px" text="Resumo do Pedido" margin="0" />
            </Container>
            <Container
              direction="column"
              align="center"
              overflow="scroll"
              height="210px"
              width="95%"
              margin="10px 0 24px 0"
              mediaHeight='100px'>
              <hr width="90%" />
              {order.map((i, index) => (
                <Item key={index}
                  title={i.item}
                  price={`R$ ${i.price}`}
                  info={i.info}
                  extra={i.extra}
                  onClick={(event) => deleteItem(event, index)} />
              ))}
              <hr width="90%" />
            </Container>
            <Container direction="column" justify="flex-end" align="center">
              <Note
                onChange={(e) => setFinalOrder({ ...finalOrder, obs: e.target.value })}
                value={finalOrder.obs}
                margin="20px 0 0 0"
                width="88%"
                height="60px"
                mediaHeight='50px'
                placeholder="Observações"
              />
              {alert.length ? <Text margin="8px 0 0 0" size="18px" text={alert} /> : null}
              {err.length ? <Err text={err} /> : null}
              <Button
                onClick={sendOrder}
                text={`Concluir R$ ${total(order)}`}
                width="88%"
                height="52px"
                margin="28px 0 18px 0" />
            </Container>
          </ResumeOrder>
        </Container>
      </Container>
    </Container>
  );
};

export default withRouter(Saloon);







