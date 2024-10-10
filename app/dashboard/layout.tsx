import { Col, Container, Row } from "react-bootstrap";
import SideBar from "@/components/side-bar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Container fluid="md">
      <Row>
        <Col md={3} className="d-none d-md-block">
          <aside className="">
            <SideBar />
          </aside>
        </Col>
        <Col md={9}>
          <section className="">
            {children}
          </section>
        </Col>
      </Row>
    </Container>
  );
}
