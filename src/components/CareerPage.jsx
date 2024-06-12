import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Card,
  CardBody,
  Badge,
  Button,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import OffcanvasJobApply from './offcanvas/JobApply';
import context from './Context';

function CareerPage() {
  const { userData } = useContext(context);

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedJob, setSelectedJob] = useState();
  const [alertVisible, setAlertVisible] = useState(false);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleApplyClick = (id) => {
    if (userData.isLoggedIn) {
      setSelectedJob(id);
      toggleOffcanvas();
    } else {
      setAlertVisible(true);
    }
  };

  const [modalOpen, setModalOpen] = useState({});

  const toggleModal = (id) => {
    setModalOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('/api/jobs');
      setJobs(await response.json());
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Container className="my-4">
      <Row>
        <Col md="12">
          <Alert
            color="danger"
            isOpen={alertVisible}
            toggle={() => setAlertVisible(false)}
          >
            Please log in to apply.
          </Alert>
          <Form
            className="mb-4"
            style={{ margin: '20px' }}
          >
            <Input
              type="search"
              name="search"
              id="jobSearch"
              placeholder="Search for jobs"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                fontSize: '18px',
                backgroundColor: '#f5f5f5',
                border: '2px solid #ccc',
                borderRadius: '10px',
                padding: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Form>
        </Col>
      </Row>
      <Row>
        {filteredJobs.map((job) => (
          <Col
            md="6"
            lg="4"
            key={job.id}
            className="p-3"
          >
            <Card
              className="mb-4 shadow-lg border-0 custom-job-card"
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#f8f9fa',
              }}
            >
              <CardBody style={{ padding: '15px' }}>
                <h5
                  className="card-title mb-3"
                  style={{ color: '#343a40', fontWeight: 'bold' }}
                >
                  {job.position}
                </h5>
                <div className="d-flex flex-wrap mb-2">
                  <Badge
                    color="dark"
                    className="mr-2 m-1"
                  >
                    {job.company}
                  </Badge>
                  <Badge
                    color="primary"
                    className="mr-2 m-1"
                  >
                    {job.location}
                  </Badge>
                </div>
                <div className="mb-4">
                  <Badge
                    color="info"
                    className="m-1"
                  >
                    Languages: {job.languages.join(', ')}
                  </Badge>
                  <Badge
                    color="info"
                    className="m-1"
                  >
                    Tools: {job.tools.join(', ')}
                  </Badge>
                </div>
                <div>
                  <Button
                    color="primary"
                    className="m-1"
                    onClick={() => handleApplyClick(job.id)}
                  >
                    Apply
                  </Button>
                  <Button
                    color="secondary"
                    className="m-1"
                    onClick={() => toggleModal(job.id)}
                  >
                    Description
                  </Button>
                  <Modal
                    isOpen={modalOpen[job.id]}
                    toggle={() => toggleModal(job.id)}
                    centered
                  >
                    <ModalHeader
                      toggle={() => toggleModal(job.id)}
                      style={{ backgroundColor: '#007bff', color: '#fff' }}
                    >
                      Job Description
                    </ModalHeader>
                    <ModalBody
                      style={{ backgroundColor: '#f8f9fa', color: '#343a40' }}
                    >
                      {job.description}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="secondary"
                        onClick={() => toggleModal(job.id)}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <OffcanvasJobApply
        show={showOffcanvas}
        handleClose={toggleOffcanvas}
        placement="end"
        selectedID={selectedJob}
      />
    </Container>
  );
}

export default CareerPage;
