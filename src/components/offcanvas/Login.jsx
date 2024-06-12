import React, { useState, useContext } from 'react';
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';
import context from '../Context';

function OffcanvasLogin({ show, handleClose, placement }) {
  const { setUserData } = useContext(context);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    }).catch(() => {
      setError('Network error');
    });

    if (response && response.ok) {
      const newUserData = await response.json();
      localStorage.setItem(
        'userData',
        JSON.stringify({ ...newUserData, isLoggedIn: true }),
      );
      setUserData((prevData) => {
        return {
          ...prevData,
          ...newUserData,
          isLoggedIn: true,
        };
      });
      handleClose();
    } else if (response) {
      const data = await response.json();
      setError(`Login failed. Please try again. ${data.message}`);
    }
  };

  return (
    <Offcanvas
      isOpen={show}
      toggle={handleClose}
      direction={placement}
    >
      <OffcanvasHeader toggle={handleClose}>Login</OffcanvasHeader>
      <OffcanvasBody>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email address</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(event) => {
                setLoginData({ ...loginData, email: event.target.value });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={(event) => {
                setLoginData({ ...loginData, password: event.target.value });
              }}
            />
          </FormGroup>
          <Button
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </Form>
      </OffcanvasBody>
    </Offcanvas>
  );
}

export default OffcanvasLogin;
