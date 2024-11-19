"use client";
import React, { useRef } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFaculties, fetchFaculty, updateFaculty } from '@/services/faculty-service';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { FacultyEditFormValues } from '@/interfaces/faculty-form-values';
import MessageAlert, { AlertHandler } from '@/components/message-alert';
import Faculty from '@/interfaces/i-faculty';

const EditFacultyPage = ({
  params
}: {
  params: {
    slug: string
  }
}) => {
  const queryClient = useQueryClient();
  const facultyId = params.slug;
  const { data: faculties } = useQuery({
    queryKey: ['faculties'],
    queryFn: fetchFaculties
  });
  const alertRef = useRef<AlertHandler>(null);
  const { data: faculty, isLoading: isFacultyLoading } = useQuery({
    queryKey: ['faculty', facultyId],
    queryFn: () => fetchFaculty(facultyId),
    enabled: !!facultyId, // Only run this query when `id` is available
  });

  const editFacultyValidationSchema = Yup.object({
    name: Yup.string()
      .required(`Name is required`)
      .matches(/^[\p{L}\p{P}\p{M}\s'-]+$/u, `Invalid characters in faculty name`)
      .max(150, `Faculty name is too long`)
      .test('unique-name', 'Faculty name already exists', function (value) {
        if (!value) { // If value is not provided, let other validations handle the required field.
          return true;
        }
        return !faculties.some((faculty: Faculty) => faculty.name === value);
      })
  });

  const mutation = useMutation<FacultyEditFormValues, Error, FacultyEditFormValues>({
    mutationFn: updateFaculty,
    onSuccess: () => {
      alertRef.current?.triggerAlert(<>Update successful.</>, 'success');
      queryClient.invalidateQueries({queryKey: ['faculties']});
      queryClient.invalidateQueries({queryKey: ['faculty', facultyId]});
    },
    onError: (error: Error) => {
      alertRef.current?.triggerAlert(error.message || 'Update failed', 'danger');
    },
  });

  const handleSubmit = async (values: FacultyEditFormValues, { setSubmitting, resetForm }: FormikHelpers<FacultyEditFormValues>) => {
    mutation.mutate(values);
    setSubmitting(false);
    resetForm({values});
  };

  return (
    <>
      <div className="full-height-container">
        {isFacultyLoading && (
          <Spinner animation="border" role="status" className="m-4">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!isFacultyLoading && (
          <div>
            <div>
              <h1>Update Faculty</h1>
            </div>
            <Row className="mt-4">
              <Col>
                <MessageAlert ref={alertRef} />
                <Formik
                  initialValues={{
                    id: facultyId,
                    name: faculty?.name || "",
                    v: faculty?.v || 0
                  }}
                  validationSchema={editFacultyValidationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
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
          </div>
        )}
      </div>
    </>
  )
}

export default EditFacultyPage;