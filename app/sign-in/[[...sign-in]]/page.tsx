import React from 'react';
import { Metadata } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import { SignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to sports analyzer",
  keywords: ["sign in", "login", "sport", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "Sign In",
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

const SignInPage = () => {
  return (
    <>
      <Container fluid="md">
        <Row className="d-flex flex-column justify-content-center align-items-center my-4">
          <Col xs={12} md={6} lg={4} className="d-flex justify-content-center">
            <SignIn />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SignInPage;