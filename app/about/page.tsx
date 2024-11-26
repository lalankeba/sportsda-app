import { Metadata } from 'next';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const metadata: Metadata = {
  title: "About",
  description: "Saves data of university students who do sports and help them to optimize their talents",
  keywords: ["about", "sport", "sports", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "About",
    description: "Saves data of university students who do sports and help them to optimize their talents",
    type: "website",
    images: [
      {
        url: "/images/back1.jpeg",
        alt: "Sports Analyzer"
      }
    ]
  }
};

const AboutPage = () => {
  return (
    <>
      <Container fluid="md" className="reduced-height-container">
        <Row>
          <Col>
            <h1>About</h1>
            <p>Content goes here...</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AboutPage