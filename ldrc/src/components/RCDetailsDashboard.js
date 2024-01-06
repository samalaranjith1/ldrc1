import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ShowRCDetails from "./ShowRCDetails";
import axios from "axios";

function RCDetailsDashboard({ searchId }) {
  const [data, setData] = useState("");
  const handleGetData = async (skip) => {
    const token = localStorage.getItem("token");
    try {
      if (skip === undefined) {
        skip = 0;
      }
      const res = await axios.get(
        `http://localhost:8080/rcdetails/${searchId}/${skip}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchId) {
      handleGetData();
    }
  }, []);

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    setShow((value) => !value);
    setShowModal((value) => !value);
    setSelectedItem(item);

    if (item == "close") {
      handleCloseModal(item);
    }
  };
  const handleCloseModal = (a) => {
    setSelectedItem(null);

    setShowModal(false);
    setShow(false);
  };

  const dataMaxLength = 16;
  const pages = 16 / 4;
  const [skip, setSkip] = useState(0);
  const handlePrev = () => {
    if (skip == 0) {
      setSkip(0);
    } else {
      setSkip((item) => item - 1);
    }
  };
  const handleNext = () => {
    if (skip === pages - 1) {
      setSkip(skip);
    } else {
      setSkip((item) => item + 1);
    }
  };
  useEffect(() => {
    console.log(skip);
    handleGetData(skip);
  }, [skip]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingBottom: "10px",
        }}
      >
        <div style={{}}>
          <Button onClick={handlePrev}>Prev</Button>
          {`from ${skip * 4 + 1} to ${skip * 4 + 4} out of ${dataMaxLength}`}
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          border: "2px solid red",
          padding: "10px",
        }}
      >
        {data &&
          data.map((item, index) => (
            // <li key={index}>
            <div
              style={{
                width: "300px",
                border: "2px solid green",
                padding: "10px",
                margin: "10px",
              }}
            >
              <strong>Agent ID:</strong> {item.agentId}
              <br />
              <strong>Driver Email:</strong> {item.driverEmail}
              <br />
              <strong>Driver Phone Number:</strong> {item.driverPhoneNumber}
              <br />
              <strong>Driver Name:</strong> {item.driverName}
              <br />
              <strong>Aadhar Number:</strong> {item.aadharNumber}
              <br />
              <strong>RC Number:</strong> {item.rcNumber}
              <br />
              <strong>Amount:</strong> {item.amount}
              <br />
              <strong>UPI Address:</strong> {item.upiAddress}
              <br />
              <strong>Payment Way:</strong> {item.paymentWay}
              <br />
              <Button key={index} onClick={() => handleClick(item)}>
                More
              </Button>
              {/* <Modal
                show={showModal}
                onHide={handleCloseModal}
                fullscreen={false}
                size="lg"
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <Form></Form>
                  <ShowRCDetails data={item} />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => handleClick("close")}>
                    move back
                  </Button>
                </Modal.Footer>
              </Modal> */}
            </div>

            // </li>
          ))}
      </div>
      {selectedItem !== null && (
        <Modal show={selectedItem !== null} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{data[selectedItem]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Modal content for {data[selectedItem]}</p>
            <ShowRCDetails data={selectedItem} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {`from ${skip + 1} to ${skip + 1} out of ${pages}`}
    </>
  );
}

export default RCDetailsDashboard;
