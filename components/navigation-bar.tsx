"use client";
import React from 'react';
import Image from 'next/image';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logoImage from "@/public/images/logo.png";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMember } from '@/hooks/use-member';

const NavigationBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { member, logout } = useMember();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <Navbar collapseOnSelect fixed="top" expand="lg" className="bg-body-tertiary">
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
                  <NavDropdown.Item onClick={() => router.push('/member')}>
                    Dashbaord
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
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
