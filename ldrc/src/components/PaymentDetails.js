import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/esm/Button";

function PaymentDetails() {
  const [formData, setFormData] = useState({
    agentId: "",
    rcDataId: "",
    paymentWay: "",
    cash: "",
    onlineTransfer: "",
    onlineTransferPaymentScreenshot: "",
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
      formData.agentId &&
      formData.rcDataId &&
      formData.amount &&
      formData.paymentWay &&
      formData.paymentWay === "OnlineTransfer"
        ? formData.onlineTransferPaymentScreenshot
        : 1
    ) {
      console.log(formData);
    } else {
      alert("All feilds are required");
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
          <h2 className="bg-white">Payment</h2>
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
              placeholder="rcDataId"
              id="rcDataId"
              name="rcDataId"
              value={formData.rcDataId}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <div style={{ padding: "2px", color: "red" }}>
            Select cash or online Transfer
          </div>
          <FormGroup>
            <Form.Check
              inline
              label="cash"
              name="paymentWay"
              type="radio"
              id="paymentWay"
              value="Cash"
              checked={formData.paymentWay === "Cash"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="onlineTranfer"
              name="paymentWay"
              type="radio"
              id="paymentWay"
              value="OnlineTransfer"
              checked={formData.paymentWay === "OnlineTransfer"}
              onChange={handleChange}
            />
          </FormGroup>

          {formData.paymentWay == "OnlineTransfer" && (
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
          )}
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
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="warning"
            size="sm"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default PaymentDetails;
