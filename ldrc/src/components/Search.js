import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Modal,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import SignUp from "./SignUp";
import DriverRegistration from "./DriverRegistration";
import TicketsTracker from "./TicketsTracker";
import PaymentDetailsDashboard from "./PaymentDetailsDashboard";
import RCDetailsDashboard from "./RCDetailsDashboard";

const Search = () => {
  const [searchType, setSearchType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [show, setShow] = useState(false);

  const handleSearch = (e) => {
    if (searchId) {
      setShow(true);
    }
    console.log(searchId);
  };
  const handleButtonClick = (type) => {
    setSearchType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSearchId("");
    setShow(false);
  };

  return (
    <Container className="container-sm">
      <div
        style={{
          display: "flex",
        }}
      >
        <h2 style={{ marginRight: "10px" }}>Search for </h2>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <ButtonGroup variant="warning">
            <br />
            <Button
              variant="success"
              onClick={() => handleButtonClick("Agent Details")}
            >
              Agent Details
            </Button>
            <Button
              variant="warning"
              onClick={() => handleButtonClick("Driver Details")}
            >
              Driver Details
            </Button>
            <Button
              variant="danger"
              onClick={() => handleButtonClick("RC Details")}
            >
              RC Details
            </Button>
            <Button
              variant="primary"
              onClick={() => handleButtonClick("Payment Details")}
            >
              Payment Details
            </Button>
            <Button
              variant="success"
              onClick={() => handleButtonClick("Tickets")}
            >
              Tickets
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        fullscreen={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{`Modal for ${searchType}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{`Searching for ${searchType}`}</h5>
          <Form>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="enter search email id"
                id="searchId"
                name="searchId"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </FormGroup>
            {searchId &&
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(searchId) ? (
              <>
                <span> Please enter proper email</span>
                <Button disabled>Search</Button>
              </>
            ) : (
              <Button onClick={handleSearch} disabled={searchId ? false : true}>
                Search
              </Button>
            )}
          </Form>
          {searchType === "Agent Details" && show && searchId && (
            <SignUp searchId={searchId} />
          )}
          {searchType === "Driver Details" && show && searchId && (
            <>
              <DriverRegistration searchId={searchId} />
            </>
          )}
          {searchType === "RC Details" && show && searchId && (
            <RCDetailsDashboard searchId={searchId} />
          )}
          {searchType === "Payment Details" && show && searchId && (
            <PaymentDetailsDashboard searchId={searchId} />
          )}
          {searchType === "Tickets" && show && searchId && (
            <TicketsTracker searchId={searchId} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Search;
