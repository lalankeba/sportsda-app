"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logoImage from "@/public/images/logo.png";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMember } from '@/hooks/use-member';
import { isTokenExpired } from '@/utils/jwt-util';
import { useSideBar } from '@/hooks/use-side-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const NavigationBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { member, token, logout } = useMember();
  const { handleShow } = useSideBar();

  useEffect(() => {
    if (isTokenExpired(token)) {
      logout();
    }
  });

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <Navbar collapseOnSelect fixed="top" expand="lg" className="bg-body-tertiary">
        <Container fluid="md">
          {member && pathname.startsWith('/dashboard') && (
            <Button variant="outline" className="d-md-none" onClick={handleShow}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </Button>
          )}
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
            {!member && (
              <Nav>
                <Nav.Link as={Link} href={`/register`} active={pathname.startsWith('/register')}>
                  Register
                </Nav.Link>
                <Nav.Link as={Link} href={`/login`} active={pathname.startsWith('/login')}>
                  Login
                </Nav.Link>
              </Nav>
            )}
            {member && (
              <Nav>
                <NavDropdown title={`${member.firstName} ${member.lastName}`} id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="#" onClick={() => router.push('/dashboard')}>
                    Dashbaord
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar;
