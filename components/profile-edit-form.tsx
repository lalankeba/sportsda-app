"use client";
import React, { useState } from 'react';
import Gender from '@/enums/gender';
import Faculty from '@/interfaces/i-faculty';
import { Button, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Member from '@/interfaces/i-member';
import { useMember } from '@/hooks/use-member';

interface ProfileEditProps {
  faculties: Faculty[];
  member?: Member;
}

interface ProfileEditFormValues {
  firstName: string;
  lastName: string;
  gender: Gender;
  facultyId: string;
  v: number;
}

const ProfileEditForm: React.FC<ProfileEditProps> = ({ faculties, member }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<React.ReactNode | null>(null);
  const [alertVariant, setAlertVariant] = useState<string>('light');
  const { getToken } = useMember();

  const registrationValidationSchema = Yup.object({
    firstName: Yup.string().trim()
      .matches(/^[\p{L}\p{M}\s'-]+$/u, `First name has invalid characters`)
      .max(40, `First name is too long`)
      .required(`First name is required`),
    lastName: Yup.string().trim()
      .matches(/^[\p{L}\p{M}\s'-]+$/u, `Last name has invalid characters`)
      .max(40, `Last name is too long`)
      .required(`Last name is required`),
    gender: Yup.mixed()
      .oneOf(Object.values(Gender), `Invalid gender`)
      .required(`required`),
    facultyId: Yup.string()
      .required(`Faculty id is required`),
  });

  const handleSubmit = async (values: ProfileEditFormValues, { setSubmitting, resetForm }: FormikHelpers<ProfileEditFormValues>) => {
    try {
      const token = getToken();
      values.v = member?.v || 0;

      const response = await fetch(`/api/members/member`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        resetForm();
        displayAlert(<>Update successful.</>, 'success');
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
      <div className="">
            {showAlert && (
              <Alert variant={alertVariant}>
                {alertContent}
              </Alert>
            )}
            <Formik
              initialValues={{ 
                firstName: member?.firstName || '',
                lastName: member?.lastName || '',
                gender: member?.gender || Gender.Male,
                facultyId: member?.faculty.id || faculties[0].id,
                v: member?.v || 0
              }}
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
                        <FontAwesomeIcon icon={faCircleNotch} spin /> {`Updating profile...`}
                      </>
                    ) : (
                      `Update`
                    )}
                  </Button>
                  <Link href="/dashboard/profile" className="btn btn-outline-secondary mx-2" role="button">
                    Cancel
                  </Link>
                </Form>
              )}
            </Formik>
      </div>
    </>
  )
}

export default ProfileEditForm;