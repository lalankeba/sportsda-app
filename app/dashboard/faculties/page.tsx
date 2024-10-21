"use client";
import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { fetchFaculties } from '@/services/faculty-service';
import Faculty from '@/interfaces/i-faculty';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';

const FacultiesPage = () => {
  const { data: faculties, isLoading } = useQuery({
    queryKey: ['faculties'],
    queryFn: fetchFaculties
  });

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
                <Link href="/dashboard/faculties/edit" className="btn btn-outline-danger me-2" role="button">
                  <FontAwesomeIcon icon={faTrash} />
                </Link>
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
        </>
      )}
    </>
  )
}

export default FacultiesPage;