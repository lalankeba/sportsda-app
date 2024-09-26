"use client";
import React from 'react';
import { useSideBar } from '@/hooks/use-side-bar';
import Link from 'next/link';
import { ListGroup, Offcanvas } from 'react-bootstrap';

const sidebarLinks = [
  { title: "Dashboard", path: '/dashboard'},
  { title: "Member", path: '/dashboard/member'},
];

const SideBar = () => {
  const { showOffcanvas, handleClose } = useSideBar();

  return (
    <>
      <div>
        <ListGroup variant="flush">
          {sidebarLinks.map((sidebarLink, id) => (
            <ListGroup.Item key={id} action as={Link} href={sidebarLink.path}>
              {sidebarLink.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div>
        <Offcanvas show={showOffcanvas} onHide={handleClose} className="d-md-none">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup variant="flush">
              {sidebarLinks.map((sidebarLink, id) => (
                <ListGroup.Item key={id} action as={Link} href={sidebarLink.path} onClick={handleClose}>
                  {sidebarLink.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default SideBar;
