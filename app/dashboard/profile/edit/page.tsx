import React from 'react';
import { Metadata } from 'next';
import { Alert, Col, Row } from 'react-bootstrap';
import { FACULTIES_PATH } from '@/utils/paths';
import Faculty from '@/interfaces/i-faculty';
import ProfileEditForm from '@/components/profile-edit-form';
import { auth } from '@clerk/nextjs/server';

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
  let faculties: Faculty[] = [];
  let error = null;

  try {
    const { getToken } = auth();
    const token = await getToken();

    const facultiesResponse = await fetch(`${process.env.BACKEND_BASE_URL}${FACULTIES_PATH}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (facultiesResponse.ok) {
      faculties = await facultiesResponse.json();
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
        <div className="full-height-container">
          <Row className="mb-2">
            <Col>
              <h1>Edit Your Profile</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <ProfileEditForm faculties={faculties} />
            </Col>
          </Row>
        </div>
        )}
      
    </>
  )
}

export default EditProfilePage;