import { Link, withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input.js';
import Button from '../components/Button.js';
import Text from '../components/Text.js';
import Error from '../components/Alert.js';
import Redirection from '../components/Link.js';
import Background from '../components/Background.js';
import ContainerLogo from '../components/container/ContainerLogo.js';
import Container from '../components/container/ContainerMenu';
import Main from '../components/Main.js';
import firebase from '../configs/FirebaseConfig.js';
import verification from '../configs/FirebaseAuth.js';
import errorFirebase from '../configs/FirebaseErrors.js';

const Ancora = styled(Link)`
  text-decoration: none;
  color: tomato;
  font-size: 16px;
 `;

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [err, setErr] = useState('');

  const signUp = (event) => {
    if (role === "" || password !== passwordConfirm) {
      setErr("Por favor, preencha seu cargo ou verifique se suas senhas são iguais")
    } else {
      event.preventDefault();
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          const user = firebase.auth().currentUser.uid;
          firebase.firestore().collection('usuario').doc(user).set({
            name: name,
            email: email,
            role: role,
            password: password,
            passwordConfirm: passwordConfirm
          });
        })
        .then(() => {
          verification(props);
        }).catch(function (error) {
          let err = error.code;
          if (errorFirebase[err]) {
            setErr(errorFirebase[err]);
          } else {
            setErr(err);
          };
        });
    };
  };

  return (
    <ContainerLogo>
      <Background />
      <Main>
        <Text text="Registro"  size="52px"/>
        <Container direction="column">
          <Input onChange={(e) => setName(e.target.value)} type='text' placeholder='Nome' />
          <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' />
          <Container direction="column" color="gay" margin=" 0 0 10px 0">
            <p>Cargo:</p>
            <Container justify="space-evenly" margin="12px 0" mediaJustify="space-between">
              <Input onChange={(e) => setRole(e.target.value)} type='radio' value=' Atendimento' name='cargo' />
              <Input onChange={(e) => setRole(e.target.value)} type='radio' value=' Cozinha' name='cargo' />
            </Container>
          </Container>
          <Input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Senha' />
          <Input onChange={(e) => setPasswordConfirm(e.target.value)} type='password' placeholder='Confirme sua senha' />
        </Container>
        {err.length ? <Error text={err} /> : null}
        <Button onClick={signUp} text="Registrar-se" />
        <Redirection text="Já possui cadastro? ">
          <Ancora to="/Login">Faça Login</Ancora>
        </Redirection>
      </Main>
    </ ContainerLogo>
  );
};

export default withRouter(Register);