"use client";
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { faCircleExclamation, faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {

  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 'calc(100svh - 3.5rem - 3.5rem)' }}>
            <h1 className="m-4">Some Error Occurred</h1>
            <h2 className="m-4">
              <FontAwesomeIcon icon={faCircleExclamation} size='2x' />
            </h2>
            <p className="text-danger m-4">
              {error.message || "An unknown error occurred."}
            </p>
            {error.digest && (
              <p className="text-warning m-4">
                Error Code: {error.digest}
              </p>
            )}
            <Button onClick={ () => reset() }>
              Try again <FontAwesomeIcon icon={faRotate} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Error;
