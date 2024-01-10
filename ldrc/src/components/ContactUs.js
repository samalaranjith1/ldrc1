import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/esm/Button";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Modal from "react-bootstrap/Modal";
import AuthLogin from "./AuthLogin";
import { jwtDecode } from "jwt-decode";
import TicketsTracker from "./TicketsTracker";
import axios from "axios";

function ContactUs() {
  const [label, setLabel] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    description: "",
    comments: [{ author: "", msg: "", icon: "" }],
    status: "",
    assignedTo: "",
    assignedBy: "",
    extraInput2: "",
    extraInput3: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.phoneNumber &&
      formData.description
    ) {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
      ) {
        if (/(0|91)?[6-9][0-9]{9}/.test(formData.phoneNumber)) {
          console.log(formData);

          try {
            await axios
              .post("http://localhost:8080/contactus/", {
                formData,
              })
              .then(async (res) => {
                console.log(res);
                if (res.data == "exist") {
                  if (alert("Details submitted,please wait for confirmation")) {
                  } else {
                    handleShow();
                  }
                } else if (res.data === "notexist") {
                  alert("Details submitted,please wait for confirmation");
                  alert("User registration successful, please login");
                }
              })
              .catch((error) => {
                alert("wrong details");
                console.log(error.stack.message);
              });
          } catch (error) {
            console.log("Error occured signup catch block" + error);
          }
        } else {
          setLabel(true);
          alert("Plase enter proper phone number");
        }
      } else {
        setLabel(true);
        alert("Please enter proper email");
      }
    } else {
      setLabel(true);
      alert("all fields are mandatory");
    }
  };
  const min = (a, b) => {
    if (a > b) {
      return b;
    } else {
      return a;
    }
  };

  let authError = "";
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
  } catch (error) {
    authError = error;
    console.log("InvalidTokenError: Invalid token specified:", error);
  }
  return (
    <Container expand="sm">
      <Form inline size="sm">
        <div
          style={{
            width: "50vw",
            alignContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            backgroundColor: "rgba(42, 255, 76,0.8)",
            borderRadius: "50px",
            padding: "15px",
            minWidth: min("80vw", "300px"),
          }}
        >
          <Button variant="warning" onClick={handleShow}>
            Contact us
          </Button>
          {authError && <AuthLogin />}
          <TicketsTracker />

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="bg-primary">
                <h2 className="bg-white text-primary">Contact us</h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup>
                {label && <FormLabel>Name</FormLabel>}
                <FormControl
                  type="text"
                  placeholder="name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormGroup>
              <div style={{ padding: "2px" }}></div>
              <FormGroup>
                {label && <FormLabel>Email</FormLabel>}
                <FormControl
                  type="email"
                  placeholder="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formData.email &&
                  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    formData.email
                  ) && <span> Please enter proper email</span>}
              </FormGroup>
              <div style={{ padding: "2px" }}></div>
              <FormGroup>
                {label && <FormLabel>Phone Number</FormLabel>}
                <FormControl
                  type="text"
                  placeholder="phoneNumber"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {formData.phoneNumber &&
                  !/(0|91)?[6-9][0-9]{9}/.test(formData.phoneNumber) && (
                    <span> Please enter proper Phone number</span>
                  )}
              </FormGroup>
              <div style={{ padding: "2px" }}></div>
              <Form.Group>
                {label && <FormLabel>Subject</FormLabel>}
                <Form.Control
                  type="text"
                  placeholder="subject"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </Form.Group>
              <div style={{ padding: "2px" }}></div>
              <Form.Group>
                {label && <FormLabel>Description</FormLabel>}
                <Form.Control
                  as="textarea"
                  rows={5}
                  type="textarea"
                  placeholder="description"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <div style={{ padding: "2px" }}></div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="warning" onClick={handleSubmit}>
                Send
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Form>
    </Container>
  );
}

export default ContactUs;
