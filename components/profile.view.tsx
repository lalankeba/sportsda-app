"use client";
import { fetchMember } from "@/services/member-service";
import { useQuery } from "@tanstack/react-query";
import { Col, Row, Spinner } from "react-bootstrap";

const ProfileView: React.FC = () => {
  const { data: member, isLoading } = useQuery({
    queryKey: ['member'],
    queryFn: fetchMember
  });

  return (
    <>
      {isLoading && (
        <Spinner animation="border" role="status" className="m-4">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && (
        <>
          <Row className="mb-2">
            <Col xs={4} md={3}>
              <label>Index No:</label>
            </Col>
            <Col>
              { member?.indexNo }
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} md={3}>
              <label>Gender:</label>
            </Col>
            <Col>
              { member?.gender }
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} md={3}>
              <label>Faculty:</label>
            </Col>
            <Col>
              { member?.faculty.name }
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} md={3}>
              <label>Province:</label>
            </Col>
            <Col>
              { member?.province }
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} md={3}>
              <label>School:</label>
            </Col>
            <Col>
              { member?.school }
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProfileView;