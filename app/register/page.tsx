import React from 'react';
import { Metadata } from 'next';
import RegistrationForm from '@/components/registration-form';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { FACULTIES_PATH } from '@/utils/paths';

export const metadata: Metadata = {
  title: "Register",
  description: "Register for sports analyzer",
  keywords: ["register", "sport", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "Register",
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

const RegisterPage = async () => {
  let faculties = [];
  let error = null;

  const facultiesUrl = `${process.env.BACKEND_BASE_URL}${FACULTIES_PATH}`;
  try {
    const response = await fetch(`${facultiesUrl}`);
    faculties = await response.json();
  } catch (err) {
    error = `Unable to load faculties. Please try again later.`;
  }

  return (
    <>
      <Container fluid="sm">
        {error && (
          <Row className='justify-content-center'>
            <Col xs='12' md={8} lg={6}>
              <Alert variant="danger">
                {error}
              </Alert>
            </Col>
          </Row>
        )}
        {!error && (
          <Row className='justify-content-center'>
            <Col xs={12} md={8} lg={6}>
              <RegistrationForm faculties={faculties} />
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}

export default RegisterPage;