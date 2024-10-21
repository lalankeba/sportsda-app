"use client";
import React, { useRef } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFaculty, fetchFaculties } from '@/services/faculty-service';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { FacultyAddFormValues } from '@/interfaces/faculty-form-values';
import MessageAlert, { AlertHandler } from '@/components/message-alert';
import Faculty from '@/interfaces/i-faculty';

const NewFacultyPage = () => {
  const queryClient = useQueryClient();
  const { data: faculties, isLoading } = useQuery({
    queryKey: ['faculties'],
    queryFn: fetchFaculties
  });
  const alertRef = useRef<AlertHandler>(null);

  const addFacultyValidationSchema = Yup.object({
    name: Yup.string()
      .required(`Name is required`)
      .matches(/^[\p{L}\p{P}\p{M}\s'-]+$/u, `Invalid characters in faculty name`)
      .max(150, `Faculty name is too long`)
      .test('unique-name', 'Faculty name already exists', function (value) {
        if (!value) { // If value is not provided, let other validations handle the required field.
          return true;
        }
        return !faculties.some((faculty: Faculty) => faculty.name.toLowerCase() === value.toLowerCase());
      })
  });

  const mutation = useMutation<FacultyAddFormValues, Error, FacultyAddFormValues>({
    mutationFn: addFaculty,
    onSuccess: () => {
      alertRef.current?.triggerAlert(<>Update successful.</>, 'success');
      queryClient.invalidateQueries({queryKey: ['faculties']});
    },
    onError: (error: Error) => {
      alertRef.current?.triggerAlert(error.message || 'Add failed', 'danger');
    },
  });

  const handleSubmit = async (values: FacultyAddFormValues, { setSubmitting, resetForm }: FormikHelpers<FacultyAddFormValues>) => {
    mutation.mutate(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      {isLoading && (
        <Spinner animation="border" role="status" className="m-4">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && (
        <>
          <div>
            <h1>Add New Faculty</h1>
          </div>
          <Row className="mt-4">
            <Col>
              <MessageAlert ref={alertRef} />
              <Formik
                initialValues={{ 
                  name: ""
                }}
                validationSchema={addFacultyValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form noValidate className="my-4">
                    <fieldset disabled={isSubmitting}>
                      <BootstrapForm.Group controlId="formName" className="mb-3">
                        <BootstrapForm.Label>{`Name`}</BootstrapForm.Label>
                        <Field name="name" className="form-control" type="text" placeholder={`Faculty name`} />
                        <ErrorMessage name="name" component="p" className="text-danger" />
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
                    <Link href="/dashboard/faculties" className="btn btn-outline-secondary mx-2" role="button">
                      Cancel
                    </Link>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default NewFacultyPage;