import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Card } from "react-bootstrap";

import { Table } from "react-bootstrap";

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
          <tr key={ticket.id}>
            <td>{ticket.id}</td>
            <td>{ticket.subject}</td>
            <td>{ticket.phoneNumber}</td>
            <td>{ticket.status}</td>
            <td>{ticket.assigned}</td>
            <td>
              <Button variant="warning" onClick={() => onOpen(ticket.id)}>
                Open
              </Button>
              <Button variant="danger" onClick={() => onDelete(ticket.id)}>
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
              <strong>Ticket ID:</strong> {ticket.id}
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
                            key={ticket.id}
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

const TicketsTracker = () => {
  const [showModal, setShowModal] = useState(false);

  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: "Issue with login",
      phoneNumber: "123-456-7890",
      status: "Open",
      assigned: "John Doe",
      comments: [
        {
          author: "customer",
          msg: "hi ticket raised from customer side",
          icon: "C",
        },
        {
          author: "agent",
          msg: "Thank you , I am working on this ticket",
          icon: "A",
        },
        {
          author: "customer",
          msg: "hi ticket raised from customer side",
          icon: "C",
        },
        {
          author: "agent",
          msg: "Thank you , I am working on this ticket",
          icon: "A",
        },
      ],
    },
    {
      id: 3,
      subject: "Issue with driver registering",
      phoneNumber: "123-456-2640",
      status: "Open",
      assigned: "Sam",
    },
  ]);

  useEffect(() => {
    console.log("tickets updated");
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
    // if (JSON.stringify(tickets) === JSON.stringify(newTicketsData)) {
    //   console.log("newTicketsData");
    // } else {
    //   console.log("hi");
    // }

    //we can push updated ticket details to the server i.e newTicketsData
  }, [tickets]);

  const [openedTickets, setOpenedTickets] = useState();
  const handleDelete = (ticketId) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets(updatedTickets);
  };

  const handleCloseModal = (e) => {
    // e.preventDefault();
    setShowModal(false);
  };

  const handleShowModal = (ticketId) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id == ticketId);
    setOpenedTickets(updatedTickets);
    setShowModal(true);
  };
  const handleUpdateTicket = (updatedTicket) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === updatedTicket.id ? { ...ticket, ...updatedTicket } : ticket
    );
    setTickets(updatedTickets);
    const updatedOpenedTickets = openedTickets.map((ticket) =>
      ticket.id === updatedTicket.id ? { ...ticket, ...updatedTicket } : ticket
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
                <Modal.Title>Ticket {ticket.id}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Ticket
                    key={ticket.id}
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
