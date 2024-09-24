import React from 'react';
import { Metadata } from 'next';
import { Col, Container, Row } from 'react-bootstrap';

export const metadata: Metadata = {
  title: "Contact",
  description: "Dashboard of sports analyzer",
  keywords: ["dashboard", "sport", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "Member Dashboard",
    description: "Dashboard of sports analyzer",
    type: "website",
    images: [
      {
        url: "/images/back1.jpeg",
        alt: "Sports Analyzer"
      }
    ]
  }
};

const ContactPage = () => {
  return (
    <>
      <Container fluid="sm">
        <Row>
          <Col xs={12} md={8} lg={6}>
            <div>
              <h1>Contact</h1>
              <p>Please contact us</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ContactPage;