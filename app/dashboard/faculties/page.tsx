"use client";
import React, { useState } from 'react';
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteFaculty, fetchFaculties } from '@/services/faculty-service';
import Faculty from '@/interfaces/i-faculty';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';

const FacultiesPage = () => {
  const queryClient = useQueryClient();
  const { data: faculties, isLoading } = useQuery({
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
      {isLoading && (
        <Spinner animation="border" role="status" className="m-4">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && (
        <>
          <div>
            <h1>Faculties</h1>
          </div>
          {faculties.map((faculty: Faculty) => (
            <Row key={faculty.id} className="mt-4">
              <Col>
                <p>{faculty.name}</p>
              </Col>
              <Col>
                <Link href={`/dashboard/faculties/edit/${faculty.id}`} className="btn btn-outline-secondary me-2" role="button">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <Button variant="danger" onClick={() => handleShow(faculty.id, faculty.name)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>

              </Col>
            </Row>
          ))}
          <Row className="my-4">
            <Col>
              <Link href="/dashboard/faculties/new" className="btn btn-outline-primary" role="button">
                <FontAwesomeIcon icon={faPlus} /> Add New
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
        </>
      )}
    </>
  )
}

export default FacultiesPage;