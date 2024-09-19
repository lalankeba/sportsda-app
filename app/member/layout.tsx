"use client";
import { useEffect } from "react";
import { useMember } from "@/hooks/use-member";
import { useRouter } from "next/navigation";
import { Col, Container, Row } from "react-bootstrap";


export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { member } = useMember();
  const router = useRouter();

  useEffect(() => {
    if (!member) {
      router.replace('/login');
    }
  }, [member, router]);

  if (!member) {
    return null;
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="member">
            <aside>
              list
            </aside>
            <section>
              {children}
            </section>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
