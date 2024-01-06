import React from "react";
import { Card, ListGroup, ListGroupItem, Image } from "react-bootstrap";

const DataDisplayComponent = ({ data }) => {
  const {
    aadharNumber,
    agentId,
    amount,
    driverEmail,
    driverName,
    driverPhoneNumber,
    paymentWay,
    rcNumber,
    upiAddress,
    rcPhoto,
    paymentScreenshots,
  } = data;

  return (
    <Card style={{ width: "400px", margin: "20px auto" }}>
      <Card.Body>
        <Card.Title className="text-center">Driver Details</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <strong>Aadhar Number:</strong> {aadharNumber}
        </ListGroupItem>
        <ListGroupItem>
          <strong>Agent ID:</strong> {agentId}
        </ListGroupItem>
        <ListGroupItem>
          <strong>Amount:</strong> {amount}
        </ListGroupItem>
        <ListGroupItem>
          <strong>Driver Email:</strong> {driverEmail}
        </ListGroupItem>
        <ListGroupItem>
          <strong>Driver Name:</strong> {driverName}
        </ListGroupItem>
        <ListGroupItem>
          <strong>Driver Phone Number:</strong> {driverPhoneNumber}
        </ListGroupItem>
        <ListGroupItem>
          <strong>Payment Way:</strong> {paymentWay}
        </ListGroupItem>
        <ListGroupItem>
          <strong>RC Number:</strong> {rcNumber}
        </ListGroupItem>
        <ListGroupItem>
          <strong>UPI Address:</strong> {upiAddress}
        </ListGroupItem>
        <ListGroupItem>
          <strong>RC Photo:</strong>{" "}
          {rcPhoto && (
            <Image
              src={rcPhoto}
              alt="RC Photo"
              rounded
              style={{ maxWidth: "100%" }}
            />
          )}
        </ListGroupItem>
        <ListGroupItem>
          <strong>Payment Screenshots:</strong>
          {paymentScreenshots &&
            paymentScreenshots.map((screenshot, index) => (
              <Image
                key={index}
                src={screenshot}
                alt={`Payment Screenshot ${index + 1}`}
                rounded
                style={{ maxWidth: "100%", margin: "5px" }}
              />
            ))}
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default DataDisplayComponent;
