import Link from 'next/link';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Resource Not Found</h1>
          <h3>404</h3>
          <p>Go back to <Link href="/">homepage</Link></p>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound;
