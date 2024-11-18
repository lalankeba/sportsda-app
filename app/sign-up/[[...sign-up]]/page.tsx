import React from 'react';
import { Metadata } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import { SignUp } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for sports analyzer",
  keywords: ["sign up", "register", "sport", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "Sign Up",
    description: "Stores sportsmen data and helps statisticians to optimize talents",
    type: "website",
    images: [
      {
        url: "/images/back1.jpeg",
        alt: "Sports Analyzer"
      }
    ]
  }
};

const SignUpPage = () => {
  return (
    <>
      <Container fluid="md">
        <Row className="d-flex flex-column justify-content-center align-items-center my-4">
          <Col xs={12} md={6} lg={4} className="d-flex justify-content-center">
            <SignUp />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SignUpPage;