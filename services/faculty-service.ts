import FacultyNewFormValues from "@/interfaces/faculty-new-form-values";

const fetchFaculties = async () => {
  const response = await fetch(`/api/faculties`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return await response.json();
};

const addFaculty = async (values: FacultyNewFormValues) => {
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

export { fetchFaculties, addFaculty }