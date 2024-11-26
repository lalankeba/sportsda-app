"use client";
import React, { useState } from 'react';
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteFaculty, fetchFaculties } from '@/services/faculty-service';
import Faculty from '@/interfaces/i-faculty';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';

const FacultiesPage = () => {
  const queryClient = useQueryClient();
  const { data: faculties, isLoading: isFacultiesLoading } = useQuery({
    queryKey: ['faculties'],
    queryFn: fetchFaculties
  });

  const [show, setShow] = useState(false);
  const [facultyName, setFacultyName] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (id: string, name: string) => {
    setFacultyId(id);
    setFacultyName(name);
    setShow(true);
  };

  const handleDelete = async () => {
    await deleteFaculty(facultyId);
    queryClient.invalidateQueries({queryKey: ['faculties']});
    setShow(false);
  };

  return (
    <>
      <div className="reduced-height-container">
        {isFacultiesLoading && (
          <Spinner animation="border" role="status" className="m-4">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!isFacultiesLoading && (
          <div>
            <div>
              <h1>Faculties</h1>
            </div>
            {faculties.map((faculty: Faculty) => (
              <Row key={faculty.id} className="mt-3">
                <Col className="d-flex justify-content-start align-items-center">
                  <span>{faculty.name}</span>
                </Col>
                <Col>
                  <Link href={`/dashboard/faculties/edit/${faculty.id}`} passHref>
                    <Button variant="outline-primary" size="sm" className="me-2" title="Update">
                      <FontAwesomeIcon icon={faPen} size="1x" />
                    </Button>
                  </Link>
                  <Button variant="outline-danger" onClick={() => handleShow(faculty.id, faculty.name)} size="sm" title="Delete">
                    <FontAwesomeIcon icon={faTrash} size="1x" />
                  </Button>
                </Col>
              </Row>
            ))}
            <Row className="my-4">
              <Col>
                <Link href="/dashboard/faculties/new" passHref>
                  <Button variant="outline-primary" size="sm">
                  <FontAwesomeIcon icon={faPlus} size="xs" /> Add New
                  </Button>
                </Link>
              </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>Do you realy want to delete <em>{facultyName}</em> ?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Yes, Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </div>
    </>
  )
}

export default FacultiesPage;