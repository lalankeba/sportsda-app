"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useMember } from '@/hooks/use-member';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { setMember, setToken, member } = useMember();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<React.ReactNode | null>(null);
  const [alertVariant, setAlertVariant] = useState<string>('light');

  useEffect(() => {
    if (member) {
      router.replace('/member');
    }
  }, [member, router]);

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .required(`Email is required`),
    password: Yup.string()
      .required(`Password is required`),
  });

  const handleSubmit = async (values: LoginFormValues, { setSubmitting, resetForm }: FormikHelpers<LoginFormValues>) => {
    try {
      const loginResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (loginResponse.ok) {
        const { token } = await loginResponse.json();
        setToken(token);
        
        const memberResponse = await fetch('/api/members/member', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (memberResponse.ok) {
          const member = await memberResponse.json();
          setMember(member);
          
          resetForm();
          router.replace('/member');
        } else {
          const responseBody = await memberResponse.json();
          displayAlert(`${responseBody.message}`, 'danger');
        }
      } else { // login failed
        const responseBody = await loginResponse.json();
        displayAlert(`${responseBody.message}`, 'danger');
      }
    } catch (error) {
      displayAlert(`Some error occurred. Please try later.`, 'danger');
    } finally {
      setSubmitting(false);
    }
  };

  const displayAlert = (content: React.ReactNode, variant: string) => {
    setAlertContent(content);
    setAlertVariant(variant);
    setShowAlert(true);
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 'calc(100svh - 3.5rem - 3.5rem)' }}>
        <Card className='m-3 shadow w-100'>
          <Card.Body>
            <Card.Title className="h1">Login</Card.Title>
            {showAlert && (
              <Alert variant={alertVariant}>
                {alertContent}
              </Alert>
            )}
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form noValidate className="my-4">
                  <fieldset disabled={isSubmitting}>
                    <BootstrapForm.Group controlId="formEmail" className="mb-3">
                      <BootstrapForm.Label>{`Email`}</BootstrapForm.Label>
                      <Field name="email" className="form-control" type="email" placeholder={`Enter email`} />
                      <ErrorMessage name="email" component="p" className="text-danger" />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group controlId="formPassword" className="mb-3">
                      <BootstrapForm.Label>{`Password`}</BootstrapForm.Label>
                      <Field name="password" className="form-control" type="password" placeholder={`Enter password`} />
                      <ErrorMessage name="password" component="p" className="text-danger" />
                    </BootstrapForm.Group>
                  </fieldset>
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <FontAwesomeIcon icon={faCircleNotch} spin /> {`Processing...`}
                      </>
                    ) : (
                      `Log in`
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default LoginForm;