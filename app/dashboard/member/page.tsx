import React from 'react';
import { Metadata } from 'next';
import Member from '@/interfaces/i-member';
import { Alert } from 'react-bootstrap';
import { getToken, getUrl } from '@/utils/common';

export const metadata: Metadata = {
  title: "Member",
  description: "View member details",
  keywords: ["dashboard", "sport", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "Member",
    description: "View member details",
    type: "website",
    images: [
      {
        url: "/images/back1.jpeg",
        alt: "Sports Analyzer"
      }
    ]
  }
};

const MemberPage = async () => {
  let member: Member | undefined;
  let error = null;

  try {
    const token = getToken();
    const url = getUrl();

    const memberResponse = await fetch(`${url}/api/members/member`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    member = await memberResponse.json();
  } catch (err) {
    error = `Unable to load member. Please try again later.`;
  }

  return (
    <>
      {!member && (
        <div>
          <Alert variant="danger">
            {error}
          </Alert>
        </div>
      )}
      <div>
        <h1>{member?.firstName} {member?.lastName}</h1>
        <h3>{member?.email}</h3>
        <h6>{member?.gender}</h6>
        <p>{member?.faculty?.name}</p>
        <div>
          <ul>
          {member?.roles?.map((role, id) => (
            <li key={id}>{role}</li>
          ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default MemberPage;