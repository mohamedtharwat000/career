import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function Footer() {
  return (
    <footer className="mt-5 bg-dark text-light p-4">
      <Container>
        <Row>
          <Col md="12">
            <h4>About Company</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
              tempore laudantium ut nostrum pariatur ad, necessitatibus
              obcaecati cupiditate quidem vero assumenda. Sit praesentium sint
              modi laborum, mollitia aut dolore temporibus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              quibusdam quidem saepe iure temporibus vel ex perspiciatis,
              consectetur doloremque animi?
            </p>
            <h6>Contact Information</h6>
            <p>
              <strong>Website:</strong>{' '}
              <a
                href="#"
                className="text-light"
              >
                companyname.com
              </a>
              <br />
              <strong>Phone:</strong> +20 0000000000
              <br />
              <strong>Headquarters:</strong> Cairo, Egypt
              <br />
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
