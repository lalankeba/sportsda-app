"use client";
import React, { useRef } from 'react';
import Gender from '@/enums/gender';
import Faculty from '@/interfaces/i-faculty';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import MessageAlert, { AlertHandler } from './message-alert';
import { fetchMember, updateMember } from '@/services/member-service';
import ProfileEditFormValues from '@/interfaces/profile-edit-form-values';
import Province from '@/enums/province';

interface ProfileEditProps {
  faculties: Faculty[];
}

const ProfileEditForm: React.FC<ProfileEditProps> = ({ faculties }) => {
  const queryClient = useQueryClient();
  const { data: member } = useQuery({
    queryKey: ['member'],
    queryFn: fetchMember
  });
  const alertRef = useRef<AlertHandler>(null);

  const mutation = useMutation<ProfileEditFormValues, Error, ProfileEditFormValues>({
    mutationFn: updateMember,
    onSuccess: () => {
      alertRef.current?.triggerAlert(<>Update successful.</>, 'success');
      queryClient.invalidateQueries({queryKey: ['member']});
    },
    onError: (error: Error) => {
      alertRef.current?.triggerAlert(error.message || 'Update failed', 'danger');
    },
  });

  const profileValidationSchema = Yup.object({
    indexNo: Yup.string()
      .notRequired(),
    gender: Yup.mixed()
      .oneOf(Object.values(Gender), `Invalid gender`)
      .required(`Gender is required`),
    facultyId: Yup.string()
      .required(`Faculty id is required`),
    province: Yup.string(),
    school: Yup.string()
      .notRequired(),
  });

  const handleSubmit = async (values: ProfileEditFormValues, { setSubmitting }: FormikHelpers<ProfileEditFormValues>) => {
    values.v = member?.v || 0;
    mutation.mutate(values);
    setSubmitting(false);
  };

  return (
    <>
      <div className="">
        <MessageAlert ref={alertRef} />
        <Formik
          initialValues={{
            indexNo: member?.indexNo || null,
            gender: member?.gender || Gender.Male,
            facultyId: member?.faculty?.id || faculties[0].id,
            province: member?.province || Province.Central,
            school: member?.school || null,
            v: member?.v || 0
          }}
          validationSchema={profileValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form noValidate className="my-4">
              <fieldset disabled={isSubmitting}>
                <BootstrapForm.Group controlId="formIndexNo" className="mb-3">
                  <BootstrapForm.Label>{`Index Number`}</BootstrapForm.Label>
                  <Field name="indexNo" className="form-control" type="text" placeholder={`Your index number`} />
                  <ErrorMessage name="indexNo" component="p" className="text-danger" />
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
                <BootstrapForm.Group controlId="formProvince" className="mb-3">
                  <BootstrapForm.Label>{`Province`}</BootstrapForm.Label>
                  <Field as={BootstrapForm.Select} name="province">
                    {Object.values(Province).map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="province" component="p" className="text-danger" />
                </BootstrapForm.Group>
                <BootstrapForm.Group controlId="formSchool" className="mb-3">
                  <BootstrapForm.Label>{`School`}</BootstrapForm.Label>
                  <Field name="school" className="form-control" type="text" placeholder={`Your school`} />
                  <ErrorMessage name="school" component="p" className="text-danger" />
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