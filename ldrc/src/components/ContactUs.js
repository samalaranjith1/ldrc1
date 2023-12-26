import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/esm/Button";
import FormLabel from "react-bootstrap/esm/FormLabel";

function ContactUs() {
  const [label, setLabel] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.phoneNumber &&
      formData.message
    ) {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
      ) {
        if (/(0|91)?[6-9][0-9]{9}/.test(formData.phoneNumber)) {
          console.log(formData);
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
          <h2 className="bg-white">Contact us</h2>
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
            {label && <FormLabel>Message</FormLabel>}
            <Form.Control
              as="textarea"
              rows={5}
              type="textarea"
              placeholder="message"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </Form.Group>
          <div style={{ padding: "2px" }}></div>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="warning"
            size="sm"
          >
            Send
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ContactUs;
