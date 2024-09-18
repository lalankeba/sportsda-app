"use client";
import React from 'react';
import Image from 'next/image';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logoImage from "@/public/images/logo.png";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NavigationBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} href="/">
            <Image alt='' src={logoImage} width="30" height="30" className="d-inline-block align-top" />
            {' '}
            Sports Analyzer
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href={`/about`} active={pathname.startsWith('/about')}>
                About
              </Nav.Link>
              <Nav.Link as={Link} href={`/contact`} active={pathname.startsWith('/contact')}>
                Contact
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} href={`/register`} active={pathname.startsWith('/register')}>
                Register
              </Nav.Link>
              <Nav.Link as={Link} href={`/login`} active={pathname.startsWith('/login')}>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar;
