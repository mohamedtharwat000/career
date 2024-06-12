import React, { useState } from 'react';
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

function OffcanvasJobApply({ show, handleClose, placement, selectedID }) {
  const [jobAppData, setJobAppData] = useState({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    resume: '',
    coverLetter: '',
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...jobAppData, id: selectedID }),
    }).catch(() => {
      setError('Network error');
    });

    if (response && response.ok) {
      handleClose();
    } else if (response) {
      const data = await response.json();
      setError(data.message);
    }
  };

  return (
    <Offcanvas
      isOpen={show}
      toggle={handleClose}
      direction={placement}
    >
      <OffcanvasHeader toggle={handleClose}>Job Application</OffcanvasHeader>
      <OffcanvasBody>
        {error && <Alert color="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={jobAppData.email}
              onChange={(e) =>
                setJobAppData({ ...jobAppData, email: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              value={jobAppData.firstName}
              onChange={(e) =>
                setJobAppData({ ...jobAppData, firstName: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              value={jobAppData.lastName}
              onChange={(e) =>
                setJobAppData({ ...jobAppData, lastName: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter phone number"
              value={jobAppData.phone}
              onChange={(e) =>
                setJobAppData({ ...jobAppData, phone: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="resume">Resume (PDF)</Label>
            <Input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    const base64 = reader.result;
                    setJobAppData((prevState) => ({
                      ...prevState,
                      resume: base64,
                    }));
                  };
                }
              }}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="coverLetter">Cover Letter (PDF)</Label>
            <Input
              type="file"
              name="coverLetter"
              id="coverLetter"
              accept=".pdf"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    const base64 = reader.result;
                    setJobAppData((prevState) => ({
                      ...prevState,
                      coverLetter: base64,
                    }));
                  };
                }
              }}
              required
            />
          </FormGroup>

          <Button
            color="primary"
            type="submit"
          >
            Submit Application
          </Button>
        </Form>
      </OffcanvasBody>
    </Offcanvas>
  );
}

export default OffcanvasJobApply;
