import { FacultyAddFormValues, FacultyEditFormValues } from "@/interfaces/faculty-form-values";

const fetchFaculties = async () => {
  const response = await fetch(`/api/faculties`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return await response.json();
};

const fetchFaculty = async (id: string) => {
  const response = await fetch(`/api/faculties/${id}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch faculty');
  }
  return await response.json();
};

const addFaculty = async (values: FacultyAddFormValues) => {
  const response = await fetch(`/api/faculties`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message || 'Error adding faculty');
  }
  return await response.json();
};

const updateFaculty = async (values: FacultyEditFormValues) => {
  const response = await fetch(`/api/faculties/${values.id}`, {
    method: 'PUT',
    body: JSON.stringify({name: values.name, v: values.v}),
  });
  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message || 'Error updating faculty');
  }
  return await response.json();
};

const deleteFaculty = async (id: string) => {
  const response = await fetch(`/api/faculties/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message || 'Error deleting faculty');
  }
  return await response.json();
};

export { fetchFaculties, fetchFaculty, addFaculty, updateFaculty, deleteFaculty }