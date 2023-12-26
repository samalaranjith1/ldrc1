import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";

function DriverRegistration() {
  const [formData, setFormData] = useState({
    agentId: "", // coming from backend
    driverName: "", // as per govt id
    phoneNumber: "",
    pnOtp: "", // phone number otp has to entered after clicking submit this field has to enabled
    emailAddress: "",
    eaOtp: "", //email otp has to entered after clicking submit this field has to enabled
    upiAddress: "",
    aadharNumber: "",
    aadharPhoto: "",
    panCardNumber: "",
    panCardPhoto: "",
    driverPhoneNumber: "",
    driverLicensePhoto: "",
    addressVillage: "",
    addressMondal: "",
    addressDistrict: "",
    addressState: "",
    addressCountry: "",
    addressPincode: "",
    extraInput2: "",
    extraInput3: "",
  });
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData, "at line 34");
    const {
      agentId,
      driverName,
      phoneNumber,
      pnOtp,
      emailAddress,
      eaOtp,
      aadharNumber,
      aadharPhoto,
      panCardNumber,
      panCardPhoto,
      driverPhoneNumber,
      driverLicensePhoto,
      addressVillage,
      addressMondal,
      addressDistrict,
      addressState,
      addressCountry,
      addressPincode,
      extraInput2,
      extraInput3,
    } = formData;

    console.log(formData, "at line 60");
    try {
      await axios
        .post("http://localhost:8080/driverregistration/", {
          agentId,
          driverName,
          phoneNumber,
          pnOtp,
          emailAddress,
          eaOtp,
          aadharNumber,
          aadharPhoto,
          panCardNumber,
          panCardPhoto,
          driverPhoneNumber,
          driverLicensePhoto,
          addressVillage,
          addressMondal,
          addressDistrict,
          addressState,
          addressCountry,
          addressPincode,
          extraInput2,
          extraInput3,
        })
        .then(async (res) => {
          console.log(formData, "at line 76");
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
          alert("wrong details");
          console.log(error.response.data);
        });
    } catch (error) {
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
      <Form
        inline
        size="sm"
        action="/home"
        method="POST"
        encType="multipart/form-data"
      >
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
          <h2 className="bg-white">Driver Registration</h2>
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
              placeholder="Enter your name as in govt id proof"
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
              placeholder="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="pnOtp"
              id="pnOtp"
              name="pnOtp"
              value={formData.pnOtp}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="emailAddress"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="eaOtp"
              id="eaOtp"
              name="eaOtp"
              value={formData.eaOtp}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="aadharNumber"
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px", color: "red" }}>
            Upload aadhar card below
          </div>
          <FormGroup>
            <FormControl
              type="file"
              placeholder="aadharPhoto"
              id="aadharPhoto"
              name="aadharPhoto"
              //   value={formData.aadharPhoto}
              onChange={handleFileChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="panCardNumber"
              id="panCardNumber"
              name="panCardNumber"
              value={formData.panCardNumber}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px", color: "red" }}>
            Upload pan card below
          </div>
          <FormGroup>
            <FormControl
              type="file"
              placeholder="panCardPhoto"
              id="panCardPhoto"
              name="panCardPhoto"
              value={formData.panCardPhoto}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <div style={{ padding: "2px", color: "red" }}>
            Upload pan card below
          </div>
          <FormGroup>
            <FormControl
              type="file"
              placeholder="driverLicensePhoto"
              id="driverLicensePhoto"
              name="driverLicensePhoto"
              value={formData.driverLicensePhoto}
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
          <div style={{ border: "2px solid red", padding: "5px" }}>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="addressVillage"
                id="addressVillage"
                name="addressVillage"
                value={formData.addressVillage}
                onChange={handleChange}
              />
            </FormGroup>
            <div style={{ padding: "2px" }}></div>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="addressMondal"
                id="addressMondal"
                name="addressMondal"
                value={formData.addressMondal}
                onChange={handleChange}
              />
            </FormGroup>
            <div style={{ padding: "2px" }}></div>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="addressDistrict"
                id="addressDistrict"
                name="addressDistrict"
                value={formData.addressDistrict}
                onChange={handleChange}
              />
            </FormGroup>
            <div style={{ padding: "2px" }}></div>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="addressState"
                id="addressState"
                name="addressState"
                value={formData.addressState}
                onChange={handleChange}
              />
            </FormGroup>
            <div style={{ padding: "2px" }}></div>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="addressCountry"
                id="addressCountry"
                name="addressCountry"
                value={formData.addressCountry}
                onChange={handleChange}
              />
            </FormGroup>
            <div style={{ padding: "2px" }}></div>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="addressPincode"
                id="addressPincode"
                name="addressPincode"
                value={formData.addressPincode}
                onChange={handleChange}
              />
            </FormGroup>
            <div style={{ padding: "2px" }}></div>
          </div>
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
          <div style={{ padding: "2px", color: "red" }}>
            Upload RC slip below
          </div>{" "}
          <FormGroup>
            <FormControl
              type="file"
              placeholder="rcPhoto"
              id="rcPhoto"
              name="rcPhoto"
              value={formData.rcPhoto}
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
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="warning"
            size="sm"
          >
            Register
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default DriverRegistration;