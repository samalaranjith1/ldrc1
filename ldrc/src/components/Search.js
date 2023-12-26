import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/Col";

function Search() {
  const [validated, setValidated] = useState(false);
  const [searchData, setSearchData] = useState({ rcDataId: "" });
  const handleChangeSearchData = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmitSearchData = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (searchData.rcDataId !== "") {
      console.log(searchData.rcDataId);
    }
    setValidated(true);

    e.preventDefault();
  };
  const [formData, setFormData] = useState({
    agentId: "",
    driverName: "",
    aadharNumber: "",
    aadharPhoto: "",
    panCardNumber: "",
    panCardPhoto: "",
    driverPhoneNumber: "",
    rcNumber: "",
    rcPhoto: "",
    amount: "",
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
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const min = (a, b) => {
    if (a > b) {
      return b;
    } else {
      return a;
    }
  };
  return (
    <>
      <Container expand="sm">
        <Form
          inline
          size="sm"
          validated={validated}
          noValidate
          onSubmit={handleSubmitSearchData}
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
            <h3 className="bg-white">Search</h3>
            <FormGroup as={Col} md="4" controlId="validationCustom01">
              <FormControl
                required
                type="text"
                placeholder="rcDataId"
                id="rcDataId"
                name="rcDataId"
                value={searchData.rcDataId}
                onChange={handleChangeSearchData}
              />
              <Form.Control.Feedback type="invalid">
                Please enter rcDataId
              </Form.Control.Feedback>
            </FormGroup>
            <div style={{ padding: "2px" }}></div>
            <Button
              type="submit"
              onClick={handleSubmitSearchData}
              variant="warning"
              size="sm"
            >
              Search
            </Button>
          </div>
        </Form>
      </Container>
      <br></br>

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
            <h2 className="bg-white">Edit Details</h2>
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
                placeholder="driverName"
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
                value={formData.aadharPhoto}
                onChange={handleChange}
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
                type="number"
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
            <Form.Check
              inline
              label="cash"
              name="paymentWay"
              type="radio"
              id="cash"
              value={formData.cash}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="onlineTranfer"
              name="paymentWay"
              type="radio"
              id="onlineTransfer"
              value={formData.onlineTransfer}
              onChange={handleChange}
            />
            <FormGroup>
              <FormControl
                type="file"
                placeholder="onlineTransferPaymentScreenshot"
                id="onlineTransferPaymentScreenshot"
                name="onlineTransferPaymentScreenshot"
                value={formData.onlineTransferPaymentScreenshot}
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
              Update
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Search;
