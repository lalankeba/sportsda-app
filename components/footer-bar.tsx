"use client";
import React, { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FooterBar = () => {
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateFooterHeight = () => {
      const footerHeight = footerRef.current?.offsetHeight || 0;
      document.documentElement.style.setProperty("--footer-bar-height", `${footerHeight}px`);
    };

    updateFooterHeight();
    window.addEventListener("resize", updateFooterHeight);
    return () => window.removeEventListener("resize", updateFooterHeight);
  }, []);

  return (
    <>
      <div ref={footerRef} className="footer-bar bg-body-tertiary">
        <Container fluid="md">
          <Row className="py-4">
            <Col className="d-flex justify-content-center align-items-center">
              <div>Copyright 2024 Sports Analyzer</div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default FooterBar;