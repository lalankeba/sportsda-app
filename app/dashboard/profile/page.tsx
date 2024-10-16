import React from 'react';
import { Metadata } from 'next';
import { Alert, Badge, Col, Row } from 'react-bootstrap';
import { auth, currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { MEMBER_SELF_PATH } from '@/utils/paths';
import Link from 'next/link';
import Member from '@/interfaces/i-member';
import ProfileView from '@/components/profile.view';

export const metadata: Metadata = {
  title: "Profile",
  description: "View profile details",
  keywords: ["dashboard", "sport", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "Profile",
    description: "View profile details",
    type: "website",
    images: [
      {
        url: "/images/back1.jpeg",
        alt: "Sports Analyzer"
      }
    ]
  }
};

const ProfilePage = async () => {
  // let member: Member | undefined = undefined;
  // let error = null;
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  // try {
  //   const { getToken } = auth();
  //   const token = await getToken();

  //   const memberResponse = await fetch(`${process.env.BACKEND_BASE_URL}${MEMBER_SELF_PATH}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (memberResponse.ok) {
  //     member = await memberResponse.json();
  //   }
  // } catch (err) {
  //   error = `Unable to load faculties. Please try again later.`;
  // }

  return (
    <>
      {/* {error && (
        <div>
          <Alert variant="danger">
            {error}
          </Alert>
        </div>
      )} */}
      {user && (
        <div>
          <Row className="my-4">
            <Col xs={4} md={3} className="d-flex justify-content-center">
              <Image src={user.imageUrl} alt="picture" width={100} height={100} />
            </Col>
            <Col>
              <h1>{user.fullName}</h1>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} md={3}>
              <label>Emails:</label>
            </Col>
            <Col>
              {user.emailAddresses.map((email) => (
                <div key={email.id} className="mb-2">
                  <span>{email.emailAddress}</span>
                  <Badge
                    className="ms-2"
                    bg={email.id === user.primaryEmailAddressId ? "primary" : "secondary"}>
                    {email.id === user.primaryEmailAddressId ? "primary" : email.verification?.status}
                  </Badge>
                </div>
              ))}
            </Col>
          </Row>
          <ProfileView />
          <Row className="mb-2">
            <Col xs={4} md={3}>
              <label>Account created at:</label>
            </Col>
            <Col>
              { new Date(user.createdAt).toLocaleString() }
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} md={3}>
              <label>Last signed in at:</label>
            </Col>
            <Col>
              { user.lastSignInAt && new Date(user.lastSignInAt).toLocaleString() }
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} md={3}>
              <label>Last active at:</label>
            </Col>
            <Col>
              { user.lastActiveAt && new Date(user.lastActiveAt).toLocaleString() }
            </Col>
          </Row>
          {role && (
            <Row className="mb-2">
              <Col xs={4} md={3}>
                <label>Role:</label>
              </Col>
              <Col>
                <p>{role}</p>
              </Col>
            </Row>
          )}
          <Row className="mb-2">
            <Col className="text-end">
              <Link href="/dashboard/profile/edit" className="btn btn-outline-primary" role="button">
                Edit
              </Link>
            </Col>
          </Row>
        </div>
      )}
      
      {/* {!member && (
        <div>
          <Alert variant="danger">
            {error}
          </Alert>
        </div>
      )} */}
      {/* <div>
        <Row className="mb-2">
          <Col>
            <h1>{member?.firstName} {member?.lastName}</h1>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4} md={2}>
            <label>Email:</label>
          </Col>
          <Col>
            <span>{member?.email}</span>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4} md={2}>
            <label>Gender:</label>
          </Col>
          <Col>
            <span>{member?.gender}</span>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4} md={2}>
            <label>Faculty:</label>
          </Col>
          <Col>
            <span>{member?.faculty?.name}</span>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4} md={2}>
            <label>Roles:</label>
          </Col>
          <Col>
            <ul>
              {member?.roles?.map((role, id) => (
                <li key={id}>{role}</li>
              ))}
            </ul>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className="text-end">
            <Link href="/dashboard/profile/edit" className="btn btn-outline-primary" role="button">
              Edit
            </Link>
          </Col>
        </Row>
      </div> */}
    </>
  )
}

export default ProfilePage;