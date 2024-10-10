import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FooterBar = () => {
  return (
    <>
      <Container fluid="md">
        <Row className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '3.5rem' }}>
          <Col xs={12} md={6} lg={4} className="d-flex justify-content-center">
            <div>Copyright 2024 Sports Analyzer</div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default FooterBar;