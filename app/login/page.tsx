import React from 'react';
import { Metadata } from 'next';
import LoginForm from '@/components/login-form';
import { Col, Container, Row } from 'react-bootstrap';

export const metadata: Metadata = {
  title: "Login",
  description: "Login to sports analyzer",
  keywords: ["login", "sport", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "Login",
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

const LoginPage = () => {
  return (
    <>
      <Container fluid="sm">
        <Row className='justify-content-center'>
          <Col xs={12} md={8} lg={6}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LoginPage;