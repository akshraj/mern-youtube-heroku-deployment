import React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from "../redux/reducers/userSlice";
import { auth, provider } from '../services/firebase';
import { signInWithPopup } from 'firebase/auth'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const ErrorMessage = styled.p`
  color:red;
`

const SignIn = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [registerErrorMsg, setRegisterErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    setLoginErrorMessage('');
    try {
      if (name === '' || password === '') {
        throw new Error('Please fill out username and password field');
      }
      dispatch(loginStart())
      const res = await axios.post(`/api/auth/login`, {
        username: name,
        password
      });
      dispatch(loginSuccess(res.data))
    } catch (err) {
      setError(true)
      setLoginErrorMessage(err?.response?.data?.message || err?.message)
      dispatch(loginFailure(err));
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (name === '' || password === '' || email === '') {
        throw new Error('Please fill out all fields');
      }
      const res = await axios.post(`/api/auth/register`, {
        username: name,
        password,
        email
      });
      dispatch(loginSuccess(res.data));
    } catch (err) {
      setError(true);
      setRegisterErrorMsg(err?.response?.data?.message || err?.message)
      console.log(err);
    }
  }

  const signInWithGoogle = () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider).then(result => {
      axios.post('/api/auth/google', {
        username: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL
      }).then(result => {
        dispatch(loginSuccess(result.data))
      })
    }).catch(err => dispatch(loginFailure(err)))
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <Input placeholder="username" onChange={e => setName(e.target.value)} />
        <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        {error && <ErrorMessage>{loginErrorMessage}</ErrorMessage>}
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        <Title>or</Title>
        <Input placeholder="username" onChange={e => setName(e.target.value)} />
        <Input placeholder="email" onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        {error && registerErrorMsg && <ErrorMessage>{registerErrorMsg}</ErrorMessage>}
        <Button onClick={handleSignUp}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
