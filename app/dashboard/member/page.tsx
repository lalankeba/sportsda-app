import React from 'react';
import { Metadata } from 'next';
import Member from '@/interfaces/i-member';
import { Alert, Col, Row } from 'react-bootstrap';
import { getToken, getUrl } from '@/utils/common';
import Link from 'next/link';

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
            <Link href="/dashboard/member/edit" className="btn btn-outline-primary" role="button">
              Edit
            </Link>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default MemberPage;