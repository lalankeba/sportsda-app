"use client";
import { useEffect, useState } from "react";
import { useMember } from "@/hooks/use-member";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { member } = useMember();
  const router = useRouter();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  useEffect(() => {
    if (!member) {
      router.replace('/login');
    }
  }, [member, router]);

  if (!member) {
    return null;
  }

  return (
    <Container fluid="md">
      <Row>
        {/* Sidebar for larger screens */}
        <Col md={3} className="d-none d-md-block">
          <aside className="p-3 bg-light">
            <h5>Options</h5>
            <ul>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Option 2</a></li>
              <li><a href="#">Option 3</a></li>
              {/* Add more options */}
            </ul>
          </aside>
        </Col>
        <Col md={9}>
          <section className="">
            <Button variant="primary" className="d-md-none mb-3" onClick={handleShow}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </Button>
            {children}
          </section>
        </Col>
      </Row>

      {/* Offcanvas for smaller screens */}
      <Offcanvas show={showOffcanvas} onHide={handleClose} className="d-md-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            <li><a href="#" onClick={handleClose}>Option 1</a></li>
            <li><a href="#" onClick={handleClose}>Option 2</a></li>
            <li><a href="#" onClick={handleClose}>Option 3</a></li>
            {/* Add more options */}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}
