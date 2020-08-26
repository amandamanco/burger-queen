import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../components/Input.js';
import Button from '../components/Button.js';
import Text from '../components/Text.js';
import Error from '../components/Alert.js';
import Redirection from '../components/Link.js';
import Background from '../components/Background.js';
import ContainerLogo from '../components/container/ContainerLogo.js';
import Container from '../components/container/ContainerMenu.js';
import Main from '../components/Main.js';
import firebase from '../configs/FirebaseConfig.js';
import verification from '../configs/FirebaseAuth.js';
import errorFirebase from '../configs/FirebaseErrors.js';

const Ancora = styled(Link)`
  text-decoration: none;
  color: tomato;
  font-size: 16px;
 `;

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const signIn = (event) => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(verification(props))
      .catch(function (error) {
        let err = error.code;
        if (errorFirebase[err]) {
          setErr(errorFirebase[err]);
        } else {
          setErr(err);
        };
      });
  };

  return (
    <ContainerLogo>
      <Background />
      <Main>
        <Text text="Login" size="52px" />
        <Container direction="column" onSubmit>
          <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' />
          <Input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Senha' />
        </Container>
        {err.length ? <Error text={err} /> : null}
        <Button onClick={signIn} text="Login" />
        <Redirection text="Funcionário novo? ">
          <Ancora to="/Register">Faça Cadastro</Ancora>
        </Redirection>
      </Main>
    </ContainerLogo>
  );
};

export default withRouter(Login);
