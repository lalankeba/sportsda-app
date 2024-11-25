"use client";
import React from 'react';
import Image from 'next/image';
import { Button, Container, ListGroup, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import logoImage from "@/public/images/logo.png";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSideBar } from '@/hooks/use-side-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const NavigationBar: React.FC = () => {
  const pathname = usePathname();
  const { sidebarLinks, showOffcanvas, handleClose, handleShow } = useSideBar();

  return (
    <>
      <Navbar collapseOnSelect fixed="top" expand="lg" className="bg-body-tertiary bg-opacity-75">
        <Container fluid="md">

          <SignedIn>
            <Button variant="outline" className="d-md-none" onClick={handleShow}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </Button>
          </SignedIn>

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
              <SignedOut>
                <SignInButton>
                  <Nav.Link as={Link} href={`/sign-in`} active={pathname.startsWith('/sign-in')}>
                    Sign in
                  </Nav.Link>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton showName>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="Dashboard"
                      labelIcon={<FontAwesomeIcon icon={faEllipsisV} />}
                      href="/dashboard"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Offcanvas show={showOffcanvas} onHide={handleClose} className="d-md-none">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup variant="flush">
              {sidebarLinks.map((sidebarLink, id) => (
                <ListGroup.Item 
                  key={id}
                  action
                  as={Link}
                  href={sidebarLink.path}
                  active={pathname.endsWith(sidebarLink.path)}
                  onClick={handleClose}
                >
                  {sidebarLink.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  )
}

export default NavigationBar;
