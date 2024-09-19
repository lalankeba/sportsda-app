import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

export const metadata: Metadata = {
  title: "Not Found",
  description: "Resource not found on this server",
  keywords: ["404", "not found"],
  openGraph: {
    title: "Not Found",
    description: "Resource not found on this server",
    type: "website",
    images: [
      {
        url: "/images/back1.jpeg",
        alt: "Sports Analyzer"
      }
    ]
  }
};

const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 'calc(100svh - 3.5rem - 3.5rem)' }}>
          <h1>Resource Not Found</h1>
          <h3>404</h3>
          <p>Go back to <Link href="/">homepage</Link></p>
        </div>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound;
