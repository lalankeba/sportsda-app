const fetchMember = async () => {
  const memberResponse = await fetch(`/api/members/member`, {
    method: 'GET',
  });
  if (!memberResponse.ok) {
    throw new Error('Error fetching member data');
  }
  return await memberResponse.json();
};

export { fetchMember }