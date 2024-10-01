import React from 'react';
import { Metadata } from 'next';
import Member from '@/interfaces/i-member';
import { Alert, Col, Row } from 'react-bootstrap';
import { getToken, getUrl } from '@/utils/common';
import { FACULTIES_PATH } from '@/utils/paths';
import Faculty from '@/interfaces/i-faculty';
import ProfileEditForm from '@/components/profile-edit-form';

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit profile details",
  keywords: ["dashboard", "sport", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "Profile",
    description: "Edit profile details",
    type: "website",
    images: [
      {
        url: "/images/back1.jpeg",
        alt: "Sports Analyzer"
      }
    ]
  }
};

const EditProfilePage = async () => {
  let member: Member | undefined = undefined;
  let faculties: Faculty[] = [];
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

    if (memberResponse.ok) {
      member = await memberResponse.json();

      const facultiesUrl = `${process.env.BACKEND_BASE_URL}${FACULTIES_PATH}`;
      const response = await fetch(`${facultiesUrl}`);
      faculties = await response.json();
    }
    
  } catch (err) {
    error = `Unable to load data. Please try again later.`;
  }

  return (
    <>
      {error && (
        <div>
          <Alert variant="danger">
            {error}
          </Alert>
        </div>
      )}
      {!error && (
        <div>
          <Row className="mb-2">
            <Col>
              <h1>Edit Your Profile</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <ProfileEditForm faculties={faculties} member={member} />
            </Col>
          </Row>
        </div>
        )}
      
    </>
  )
}

export default EditProfilePage;