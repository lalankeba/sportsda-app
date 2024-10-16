import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FooterBar = () => {
  return (
    <>
      <Container fluid="md">
        <Row style={{ minHeight: '3.5rem' }}>
          <Col className="d-flex justify-content-center align-items-center">
            <div>Copyright 2024 Sports Analyzer</div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default FooterBar;