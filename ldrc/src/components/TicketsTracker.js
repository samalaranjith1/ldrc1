import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Card, Alert } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

import { Table } from "react-bootstrap";
import axios from "axios";
const TicketStatusTrackerTable = ({ tickets, onDelete, onOpen }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Ticket ID</th>
          <th>Subject</th>
          <th>Phone Number</th>
          <th>Status</th>
          <th>Assigned</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket._id}>
            <td>{ticket._id}</td>
            <td>{ticket.subject}</td>
            <td>{ticket.phoneNumber}</td>
            <td>{ticket.status}</td>
            <td>{ticket.assigned}</td>
            <td>
              <Button variant="warning" onClick={() => onOpen(ticket._id)}>
                Open
              </Button>
              <Button variant="danger" onClick={() => onDelete(ticket._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Ticket = ({ ticket, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTicket, setEditedTicket] = useState({ ...ticket });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const [newComment, setNewComment] = useState({
    author: "customer", //need to get role from database,
    icon: "C", //need to getfrom database
    msg: "",
  });
  const handleCommentChange = (e) => {
    setNewComment({ ...newComment, msg: e.target.value });
  };

  const handleAddCommentClick = async () => {
    setEditedTicket((prevTicket) => ({
      ...prevTicket,
      comments: [...prevTicket.comments, newComment],
    }));
    setNewComment({
      author: "customer", //need to get role from database,
      icon: "C", //need to getfrom database
      msg: "",
    });
    handleSaveClick();
  };
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedTicket({ ...ticket });
  };
  const handleSaveClick = () => {
    setEditMode(false);
    onEdit(editedTicket);
  };
  return (
    <Card>
      <Card.Body>
        {editMode ? (
          <Form>
            <Form.Group controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={editedTicket.subject}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={editedTicket.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={editedTicket.status}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAssigned">
              <Form.Label>Assigned</Form.Label>
              <Form.Control
                type="text"
                name="assigned"
                value={editedTicket.assigned}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="success" onClick={handleSaveClick}>
              Save
            </Button>{" "}
            <Button variant="secondary" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <Card.Title>{ticket.subject}</Card.Title>
            <Card.Text>
              <strong>Ticket ID:</strong> {ticket._id}
              <br />
              <strong>Phone Number:</strong> {ticket.phoneNumber}
              <br />
              <strong>Status:</strong> {ticket.status}
              <br />
              <strong>Assigned:</strong> {ticket.assigned}
              <br style={{ marginBottom: "10px" }} />
              <div style={{ margin: "10px" }} className="shadow ">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h4>Comments</h4>
                </div>
                <div>
                  {ticket.comments &&
                    ticket.comments.map((comment) => (
                      <>
                        {comment.msg && (
                          <Comment
                            key={ticket._id}
                            comment={comment}
                            // onEdit={comment}
                          />
                        )}
                      </>
                    ))}
                </div>
                <br style={{ backgroundColor: "yellow" }} />
                <div>
                  <Form.Group controlId="formSubject" className="d-inline">
                    <Form.Control
                      type="text"
                      id="newComment"
                      name="newComment"
                      placeholder="add a new comment here"
                      value={newComment.msg}
                      onChange={handleCommentChange}
                    />
                  </Form.Group>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={handleAddCommentClick}
                  >
                    add comment
                  </Button>
                </div>
              </div>
            </Card.Text>
            <Button variant="primary" onClick={handleEditClick}>
              Edit
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

const Comment = ({ comment, index }) => {
  return (
    <Card>
      <Card.Body>
        {comment.msg && (
          <li key={index}>
            <strong>
              {comment.author} ({comment.icon}):
            </strong>
            {comment.msg}
          </li>
        )}
      </Card.Body>
    </Card>
  );
};

const TicketsTracker = ({ searchId }) => {
  const [tickets, setTickets] = useState([]);
  const [ticketsDataFromServer, setTicketsDataFromServer] = useState([]);
  const handleGetData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `http://localhost:8080/contactus/${searchId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTickets([...res.data.data]);
      setTicketsDataFromServer([...res.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchId) {
      searchId = "1234568@gmail.com";
    } // needs to update this details
    if (searchId) {
      handleGetData();
    }
  }, []);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // console.log("tickets updated");
    if (JSON.stringify(tickets) === JSON.stringify(ticketsDataFromServer)) {
      // console.log("Tickets data not updated and same as server");
    } else {
      console.log("Tickets data got updated not same as server");
      const ticketsLength = ticketsDataFromServer.length;
      for (let i = 0; i < ticketsLength; i++) {
        if (
          JSON.stringify(tickets[i]) !==
          JSON.stringify(ticketsDataFromServer[i])
        ) {
          updateTicket(tickets[i]._id, tickets[i]);
        }
      }
    }
    const newTicketsData = tickets.map((ticket) => {
      const newComments = [];
      const ticketComments =
        ticket.comments &&
        ticket.comments.map((comment) => {
          if (comment.msg) {
            newComments.push(comment);
          }
        });
      const newTicket = { ...ticket, comments: newComments };
      return newTicket;
    });
    // console.log(newTicketsData);
    // if (JSON.stringify(tickets) === JSON.stringify(newTicketsData)) {
    //   console.log("newTicketsData");
    // } else {
    //   console.log("hi");
    // }
  }, [tickets]);

  const updateTicket = async (ticketId, ticketData) => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userEmail = decoded.email;
    console.log(ticketData);
    try {
      const res = await axios.patch(
        `http://localhost:8080/contactus/${userEmail}/${ticketId}`,
        ticketData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [openedTickets, setOpenedTickets] = useState();
  const handleDelete = (ticketId) => {
    // const updatedTickets = tickets.filter((ticket) => ticket._id !== ticketId);
    deleteTicket(ticketId);
    // setTickets(updatedTickets);
    alert("Ticket deleted please refresh");
  };
  const deleteTicket = async (ticketId) => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userEmail = decoded.email;
    await axios.delete(
      `http://localhost:8080/contactus/${userEmail}/${ticketId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  const handleCloseModal = (e) => {
    // e.preventDefault();
    setShowModal(false);
  };

  const handleShowModal = (ticketId) => {
    const updatedTickets = tickets.filter((ticket) => ticket._id == ticketId);
    setOpenedTickets(updatedTickets);
    setShowModal(true);
  };
  const handleUpdateTicket = (updatedTicket) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket._id === updatedTicket._id
        ? { ...ticket, ...updatedTicket }
        : ticket
    );
    setTickets(updatedTickets);
    const updatedOpenedTickets = openedTickets.map((ticket) =>
      ticket._id === updatedTicket._id
        ? { ...ticket, ...updatedTicket }
        : ticket
    );
    setOpenedTickets(updatedOpenedTickets);
  };
  return (
    <Container>
      <h1>My Tickets</h1>
      <TicketStatusTrackerTable
        tickets={tickets}
        onDelete={handleDelete}
        onOpen={handleShowModal}
      />

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        fullscreen={false}
        size="lg"
      >
        {openedTickets &&
          openedTickets.map((ticket) => (
            <>
              <Modal.Header closeButton>
                {" "}
                <Modal.Title>Ticket {ticket._id}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Ticket
                    key={ticket._id}
                    ticket={ticket}
                    onEdit={handleUpdateTicket}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                </Form>
              </Modal.Body>
            </>
          ))}
      </Modal>
    </Container>
  );
};

export default TicketsTracker;
