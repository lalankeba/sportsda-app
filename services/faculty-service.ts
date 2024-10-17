const fetchFaculties = async () => {
  const response = await fetch(`/api/faculties`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return await response.json();
};

export { fetchFaculties }