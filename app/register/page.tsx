import React from 'react';
import RegistrationForm from '@/components/registration-form';

const RegisterPage = async () => {
  let faculties = [];
  let error = null;

  const facultiesUrl = `${process.env.BACKEND_BASE_URL}${process.env.BACKEND_FACULTIES_PATH}`;
  try {
    const response = await fetch(`${facultiesUrl}`);
    faculties = await response.json();
  } catch (err) {
    error = `Unable to load faculties. Please try again later.`;
  }

  return (
    <>
      <RegistrationForm faculties={faculties} error={error} />
    </>
  )
}

export default RegisterPage;