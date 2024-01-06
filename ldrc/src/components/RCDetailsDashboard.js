import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ShowRCDetails from "./ShowRCDetails";
import axios from "axios";

function RCDetailsDashboard({ searchId }) {
  const [data, setData] = useState("");
  const handleGetData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `http://localhost:8080/rcdetails/${searchId}`,
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
  const handleClick = (item) => {
    setShow((value) => !value);
    setShowModal((value) => !value);
    if (item == "close") {
      handleCloseModal(item);
    }
  };
  const handleCloseModal = (a) => {
    setShowModal(false);
    setShow(false);
  };
  return (
    <>
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
              <Button onClick={() => handleClick(item)}>More</Button>
              <Modal
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
              </Modal>
            </div>

            // </li>
          ))}
      </div>
    </>
  );
}

export default RCDetailsDashboard;
