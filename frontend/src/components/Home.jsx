// Home.jsx
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgb(37,37,37);
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  font-weight: 900;
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  color: white;
  margin: 10px 200px;
`;

const Navbar = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
`;

const NavButton = styled.button`
  border: 2px solid #D2FF72;
  color: #000000;
  background-color: #D2FF72;
  padding: 6px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: rgb(37,37,37);
    color: rgb(255, 255, 255);
    border: 2px solid #000000;
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(37, 37, 37);
`;

const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 450px;
  text-align: center;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
`;

const FormInput = styled.input`
  width: 97%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #D2FF72;
  color: #000;
  border: 2px solid #D2FF72;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: #b8e65f;
    border-color: #b8e65f;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const LinkText = styled.p`
  font-size: 0.9rem;
  color: #000;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #9b9b9b;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use login from AuthContext

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const { email, password } = loginForm;
    if (!email || !password) {
      setLoginError('Please fill in all fields.');
      return;
    }
    // Use login function from AuthContext
    const success = await login(email, password);
    if (success) {
      setLoginOpen(false);
      navigate('/dashboard', { replace: true });
    } else {
      setLoginError('Login failed: Invalid credentials or network error.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');
    const { email, password, confirmPassword, name } = signupForm;
    if (!email || !password || !confirmPassword || !name) {
      setSignupError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setSignupError('Passwords do not match.');
      return;
    }
    try {
      console.log('Sending signup request:', { email, password, name });
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      console.log('Signup response:', { status: response.status, data });
      if (response.ok) {
        setSignupOpen(false);
        alert(data.message);
        setLoginOpen(true);
      } else {
        setSignupError(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError('Network error: Please check your connection or server.');
    }
  };

  return (
    <HomeContainer>
      {!loginOpen && !signupOpen && (
        <>
          <Title>Welcome to ResearchXtract</Title>
          <Tagline>Upload your papers...</Tagline>
          <Navbar>
            <NavButton onClick={() => setLoginOpen(true)}>Login</NavButton>
            <NavButton onClick={() => setSignupOpen(true)}>Signup</NavButton>
          </Navbar>
        </>
      )}

      {loginOpen && (
        <FormContainer>
          <Card>
            <FormTitle>Login</FormTitle>
            {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
            <form onSubmit={handleLoginSubmit}>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
              <SubmitButton type="submit">Login</SubmitButton>
            </form>
            <LinkText onClick={() => { setLoginOpen(false); setSignupOpen(true); }}>
              New user? Signup
            </LinkText>
          </Card>
        </FormContainer>
      )}

      {signupOpen && (
        <FormContainer>
          <Card>
            <FormTitle>Signup</FormTitle>
            {signupError && <ErrorMessage>{signupError}</ErrorMessage>}
            <form onSubmit={handleSignupSubmit}>
              <FormInput
                type="text"
                name="name"
                placeholder="Name"
                value={signupForm.name}
                onChange={handleSignupChange}
                required
              />
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={signupForm.email}
                onChange={handleSignupChange}
                required
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={signupForm.password}
                onChange={handleSignupChange}
                required
              />
              <FormInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                required
              />
              <SubmitButton type="submit">Signup</SubmitButton>
            </form>
            <LinkText onClick={() => { setSignupOpen(false); setLoginOpen(true); }}>
              Already a user? Login
            </LinkText>
          </Card>
        </FormContainer>
      )}
    </HomeContainer>
  );
};

export default Home;