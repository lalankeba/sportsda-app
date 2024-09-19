"use client";
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FooterBar = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div>Copyright 2024 Sports Analyzer</div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default FooterBar