import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function Footer() {
  return (
    <footer className="mt-5 bg-dark text-light p-4">
      <Container>
        <Row>
          <Col md="12">
            <h4>About Mabrains</h4>
            <p>
              Mabrains is an AI company leveraging cutting-edge technologies to
              deliver solutions across various domains such as Electrical
              Engineering, Computer Vision, and Financial Analysis, with a
              strong focus on AI applications in Chip Design and Manufacturing.
            </p>
            <p>
              Our vision is to develop AI systems and solutions that achieve
              human-level performance in both specific domains and general
              intelligence.
            </p>
            <h6>Contact Information</h6>
            <p>
              <strong>Website:</strong>{' '}
              <a
                href="https://mabrains.com"
                className="text-light"
              >
                mabrains.com
              </a>
              <br />
              <strong>Phone:</strong> +20 0220650226
              <br />
              <strong>Headquarters:</strong> Sheraton, Cairo
              <br />
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
