import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Input from '../components/auth/Input.js';
import Button from '../components/auth/Button.js';
import Title from '../components/auth/Title.js';
import Error from '../components/auth/Error.js';
import Redirection from '../components/auth/Link.js';
import Background from '../components/auth/Background.js';
import Container from '../components/auth/Container.js';
import Main from '../components/auth/Main.js';
import Forms from '../components/auth/Forms.js';
import Radio from '../components/auth/ContainerForms.js';

const Register = () => {
  return (
    <Container>
      <Background />
      <Main>
        <Title text="Registro" />
        <Forms>
          <Input type='text' placeholder='Nome' />
          <Input type='email' placeholder='Email' />
          <Radio>
            <p>Cargo:</p>
            <div>
              <Input type='radio' value=' Atendimento' name='cargo' />
              <Input type='radio' value=' Cozinha' name='cargo' />
            </div>
          </Radio>
          <Input type='password' placeholder='Senha' />
          <Input type='password' placeholder='Confirme sua senha' />
        </Forms>
        <Error />
        <Button text="Registrar-se" />
        <Redirection text="Já possui cadastro? ">
          <Link to="/Login">Faça Login</Link>
        </Redirection>
      </Main>
    </ Container>
  );
};

export default withRouter(Register);