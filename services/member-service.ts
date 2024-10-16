import ProfileEditFormValues from "@/interfaces/profile-edit-form-values";

const fetchMember = async () => {
  const memberResponse = await fetch(`/api/members/member`, {
    method: 'GET',
  });
  if (!memberResponse.ok) {
    throw new Error('Error fetching member data');
  }
  return await memberResponse.json();
};

const updateMember = async (values: ProfileEditFormValues) => {
  const response = await fetch(`/api/members/member`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message || 'Error updating member');
  }
  return await response.json();
};

export { fetchMember, updateMember }