"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Gender from '@/enums/gender';
import Faculty from '@/interfaces/i-faculty';
import { Button, Card, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useMember } from '@/hooks/use-member';

interface RegistrationFormProps {
  faculties: Faculty[]
}

interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Gender;
  facultyId: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ faculties }) => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<React.ReactNode | null>(null);
  const [alertVariant, setAlertVariant] = useState<string>('light');
  const { member } = useMember();

  useEffect(() => {
    if (member) {
      router.replace('/member');
    }
  }, [member, router]);

  const registrationValidationSchema = Yup.object({
    firstName: Yup.string().trim()
      .matches(/^[\p{L}\p{M}\s'-]+$/u, `First name has invalid characters`)
      .max(40, `First name is too long`)
      .required(`First name is required`),
    lastName: Yup.string().trim()
      .matches(/^[\p{L}\p{M}\s'-]+$/u, `Last name has invalid characters`)
      .max(40, `Last name is too long`)
      .required(`Last name is required`),
    email: Yup.string()
      .email(`Email is invalid`)
      .required(`Email is required`),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .max(50, 'Password is too long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
      .matches(/^\S*$/, 'Password must not contain spaces')
      .required(`Password is required`),
    gender: Yup.mixed()
      .oneOf(Object.values(Gender), `Invalid gender`)
      .required(`required`),
    facultyId: Yup.string()
      .required(`Faculty id is required`),
  });

  const handleSubmit = async (values: RegistrationFormValues, { setSubmitting, resetForm }: FormikHelpers<RegistrationFormValues>) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        resetForm();
        displayAlert(<>Registration successful. You will be redirected to <Alert.Link as={Link} href="/login">login</Alert.Link> page shortly.</>, 'success');
        setTimeout(() => {
          router.replace('/login');
        }, 3000);
      } else {
        const responseBody = await response.json();
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
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '84svh'}}>
        <Card className='m-3 shadow w-100'>
          <Card.Body>
            <Card.Title className="h1">Register</Card.Title>
            {showAlert && (
              <Alert variant={alertVariant}>
                {alertContent}
              </Alert>
            )}
            <Formik
              initialValues={{ firstName: '', lastName: '', email: '', password: '', gender: Gender.Male, facultyId: faculties[0].id }}
              validationSchema={registrationValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form noValidate className="my-4">
                  <fieldset disabled={isSubmitting}>
                    <BootstrapForm.Group controlId="formFirstName" className="mb-3">
                      <BootstrapForm.Label>{`First Name`}</BootstrapForm.Label>
                      <Field name="firstName" className="form-control" type="text" placeholder={`Enter first name`} />
                      <ErrorMessage name="firstName" component="p" className="text-danger" />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group controlId="formLastName" className="mb-3">
                      <BootstrapForm.Label>{`Last Name`}</BootstrapForm.Label>
                      <Field name="lastName" className="form-control" type="text" placeholder={`Enter last name`} />
                      <ErrorMessage name="lastName" component="p" className="text-danger" />
                    </BootstrapForm.Group>
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
                    <BootstrapForm.Group controlId="formGender" className="mb-3">
                      <BootstrapForm.Label>{`Gender`}</BootstrapForm.Label>
                      <Field as={BootstrapForm.Select} name="gender">
                        {Object.values(Gender).map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="gender" component="p" className="text-danger" />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group controlId="formFacultyId" className="mb-3">
                      <BootstrapForm.Label>{`Faculty`}</BootstrapForm.Label>
                      <Field as={BootstrapForm.Select} name="facultyId">
                        {faculties.map((faculty) => (
                          <option key={faculty.id} value={faculty.id}>
                            {faculty.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="facultyId" component="p" className="text-danger" />
                    </BootstrapForm.Group>
                  </fieldset>
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <FontAwesomeIcon icon={faCircleNotch} spin /> {`Creating account...`}
                      </>
                    ) : (
                      `Register`
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

export default RegistrationForm;