import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Blink from "react-blink-text";
import AuthLogin from "./AuthLogin";

function RCDetails() {
  const [formData, setFormData] = useState({
    agentId: "",
    secretKey: "",
    driverPhoneNumber: "", // need to check with the database whether details are available or not,
    driverName: "", // need to cross verify with data in database
    aadharNumber: "", // need to cross verify with data in database
    rcNumber: "",
    // rcPhoto: "",
    amount: "",
    upiAddress: "", // need to get from backend
    extraInput2: "",
    extraInput3: "",
  });
  const [rcPhoto, setRCPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.type === "text" ? value : files[0],
    });
  };
  const handleFileChange1 = (e) => {
    setRCPhoto(e.target.files[0]);
  };

  let authError = "";
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    console.log(decoded);
  } catch (error) {
    authError = error;
    console.log("InvalidTokenError: Invalid token specified:", error);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData, rcPhoto, "at line 34");

    const formFilesData = new FormData();
    formFilesData.append("file", rcPhoto);

    const token = localStorage.getItem("token");

    try {
      await axios
        .post(
          "http://localhost:8080/rcdetails",
          {
            formData,
            rcPhoto,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {
          if (res.data == "exist") {
            if (alert("Details submitted,please wait for confirmation")) {
              // navigate("/login", { state: formData });
            } else {
              // handleShow();
              // setEmailChangeAlert(true);
            }
          } else if (res.data === "notexist") {
            alert("Details submitted,please wait for confirmation");
            alert("User registration successful, please login");
            // navigate("/login", { state: formData });
          }
        })
        .catch((error) => {
          console.log(error);

          alert("wrong details");
          console.log(error.response.data);
        });
    } catch (error) {
      localStorage.removeItem("token");
      console.log("Error occured Home catch block" + error);
    }
  }
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
          <h2 className="bg-white">RC details</h2>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="agentId"
              id="agentId"
              name="agentId"
              value={formData.agentId}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Enter your secret key"
              id="secretKey"
              name="secretKey"
              value={formData.secretKey}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Driver phone number"
              id="driverPhoneNumber"
              name="driverPhoneNumber"
              value={formData.driverPhoneNumber}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="driver name"
              id="driverName"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="aadhar number"
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="rcNumber"
              id="rcNumber"
              name="rcNumber"
              value={formData.rcNumber}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <Form.Label htmlFor="rcPhoto">RC Photo</Form.Label>
            <FormControl
              type="file"
              placeholder="rcPhoto"
              id="rcPhoto"
              name="rcPhoto"
              accept="image/*"
              // value={formData q.rcPhoto}
              onChange={handleFileChange1}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="amount"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="upiAddress"
              id="upiAddress"
              name="upiAddress"
              value={formData.upiAddress}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="extraInput2"
              id="extraInput2"
              name="extraInput2"
              value={formData.extraInput2}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="extraInput3"
              id="extraInput3"
              name="extraInput3"
              value={formData.extraInput3}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>

          <div style={{ padding: "2px" }}></div>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="warning"
            size="sm"
            disabled={authError ? true : false}
          >
            Submit
          </Button>
          <Blink
            fontSize="24px"
            text={
              authError && (
                <>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    <a href="/auth/login">Please Login Again</a>for driver
                    registration
                  </span>
                </>
              )
            }
          ></Blink>
          {authError && <AuthLogin />}
        </div>
      </Form>
    </Container>
  );
}

export default RCDetails;
