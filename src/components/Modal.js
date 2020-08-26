import React from 'react';
import Input from './Input';
import styled from 'styled-components';
import Container from './container/ContainerMenu';
import Button from './Button';

const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Close = styled.button`
  width: 32px;
  height: 32px;
  background-color: tomato;
  color: white;
  font-size: 20px;
  position: absolute;
  right: 5%;
  top: 4%;
  border: 2px solid tomato;
  border-radius: 50%;
`;

const Modal = (props) => {
  return (
    <Background>
      <Container
        color='white'
        width='60%'
        height='48%'
        justify='space-around'
        direction='column'
        radius='26px'
        padding='30px'
      >
        <Close onClick={props.onClose}>X</Close>
        <Container justify="center">
          <h3>Tipo de hamburguer</h3>
        </Container>
        <Container direction='row' justify='space-evenly' margin="0">
          <Input onChange={props.onChangeBurger} type='radio' value=' Bovino' name='hamburger' margin="0" />
          <Input onChange={props.onChangeBurger} type='radio' value=' Frango' name='hamburger' margin="0" />
          <Input onChange={props.onChangeBurger} type='radio' value=' Vegano' name='hamburger' margin="0" />
        </Container>
        <Container justify="center" margin="10px 0 0 0">
          <h3>Extra (R$ 1,00 cada)</h3>
        </Container>
        <Container direction='row' justify='space-evenly' padding="6px">
          <form>
            <input onChange={props.onChangeExtra} type="checkbox" name="ovo" value="Ovo" />
            <label> Ovo</label>
            <input type="checkbox" name="queijo" value="Queijo" />
            <label> Queijo</label>
            <input type="checkbox" name="nenhum" value="Nenhum" />
            <label> Nenhum</label>
          </form>

          {/* <Input onChange={props.onChangeExtra} type='checkbox' value=' Ovo' name='extra1' />
          <Input onChange={props.onChangeExtra} type='checkbox' value=' Queijo' name='extra2' />
          <Input onChange={props.onChangeExtra} type='checkbox' value=' Nenhum' name='extra3' /> */}
        </Container>
        <Container justify="center" align="flex-end">
          <Button width="50%" onClick={props.onClick} text='Enviar' />
        </Container>
      </Container>
    </Background>
  )
}

export default Modal;