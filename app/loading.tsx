import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="m-4">Loading...</h1>
            <Spinner animation="border" role="status" className="m-4">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Loading;
