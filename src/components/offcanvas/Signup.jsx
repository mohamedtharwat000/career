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

function OffcanvasSignup({ show, placement, handleClose }) {
  const { setUserData } = useContext(context);
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    }).catch(() => {
      setError('Network error');
    });

    if (response && response.ok) {
      const data = await response.json();
      const newUserData = { ...data, isLoggedIn: true };
      localStorage.setItem('userData', JSON.stringify(newUserData));
      setUserData((prevData) => {
        return {
          ...prevData,
          ...newUserData,
        };
      });
      handleClose();
    } else if (response) {
      const data = await response.json();
      setError(`Signup failed. Please try again. ${data.message}`);
    }
  };

  return (
    <div>
      <Offcanvas
        isOpen={show}
        toggle={handleClose}
        direction={placement}
      >
        <OffcanvasHeader toggle={handleClose}>Sign Up</OffcanvasHeader>
        <OffcanvasBody>
          {error && <Alert color="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Name</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Name"
                required
                onChange={(event) => {
                  setSignupData({
                    ...signupData,
                    username: event.target.value,
                  });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                required
                onChange={(event) => {
                  setSignupData({ ...signupData, email: event.target.value });
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
                  setSignupData({
                    ...signupData,
                    password: event.target.value,
                  });
                }}
              />
            </FormGroup>
            <Button
              color="primary"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default OffcanvasSignup;
