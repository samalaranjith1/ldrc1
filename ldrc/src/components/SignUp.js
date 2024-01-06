import React, { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function SignUp({ searchId, data }) {
  const navigate = useNavigate("");
  const [label, setLabel] = useState(false);
  const [emailChangeAlert, setEmailChangeAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    addressCountry: "",
    addressState: "",
    addressDistrict: "",
    districtRegistrationNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(false);
  const [remove, setRemove] = useState(false);
  const handleGetData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/auth/signup/${searchId}`
      );
      setFormData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchId) {
      handleGetData();
      setUpdate(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.phoneNumber &&
      formData.addressCountry &&
      formData.addressState &&
      formData.addressDistrict &&
      formData.districtRegistrationNumber &&
      formData.password &&
      formData.confirmPassword
    ) {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
      ) {
        if (/(0|91)?[6-9][0-9]{9}/.test(formData.phoneNumber)) {
          if (formData.password === formData.confirmPassword) {
            const {
              name,
              email,
              phoneNumber,
              addressCountry,
              addressState,
              addressDistrict,
              districtRegistrationNumber,
              password,
              confirmPassword,
            } = formData;
            console.log(formData, "data");
            if (update) {
              try {
                const res = await axios.patch(
                  `http://localhost:8080/auth/signup/${searchId}`,
                  {
                    formData,
                  }
                );
                setFormData(res.data.data);
              } catch (error) {
                console.log(error);
              }
            }
            if (!update) {
              try {
                await axios
                  .post("http://localhost:8080/auth/signup", {
                    name,
                    email,
                    phoneNumber,
                    addressCountry,
                    addressState,
                    addressDistrict,
                    districtRegistrationNumber,
                    password,
                    confirmPassword,
                  })
                  .then(async (res) => {
                    console.log(res);
                    if (res.data == "exist") {
                      if (
                        alert("Details submitted,please wait for confirmation")
                      ) {
                        navigate("/auth/login", { state: formData });
                      } else {
                        handleShow();
                        setEmailChangeAlert(true);
                      }
                    } else if (res.data === "notexist") {
                      alert("Details submitted,please wait for confirmation");
                      alert("User registration successful, please login");
                      navigate("/auth/login", { state: formData });
                    }
                  })
                  .catch((error) => {
                    alert("wrong details");
                    console.log(error.stack.message);
                  });
              } catch (error) {
                console.log("Error occured signup catch block" + error);
              }
            }
            // navigate("/login", { state: formData });
          } else {
            setLabel(true);
            alert("Please enter password and confrimPassword as same");
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
      alert("Please enter all fileds");
    }
  }
  const min = (a, b) => {
    if (a > b) {
      return b;
    } else {
      return a;
    }
  };
  const handleLogin = (e) => {
    navigate("/auth/login", { replace: true });
  };
  return (
    <Container
      expand="sm"
      className={searchId && formData._id == undefined && "d-none"}
    >
      <Form inline size="sm" onSubmit={handleSubmit} action="POST">
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
          {update && <h2 className="bg-white">Update</h2>}

          {!update && <h2 className="bg-white">SignUp</h2>}
          <FormGroup>
            {label && <Form.Label>Name</Form.Label>}
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
            {label && <Form.Label>Email</Form.Label>}
            <FormControl
              style={{ color: update ? "red" : "" }}
              type="email"
              placeholder="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={update ? true : false}
            />
            {formData.email &&
              !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                formData.email
              ) && <span> Please enter proper email</span>}
            {emailChangeAlert && <span>Please use different email</span>}
          </FormGroup>

          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            {label && <Form.Label>Phone Number</Form.Label>}
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
          <FormGroup>
            {label && <Form.Label>Country</Form.Label>}
            <FormControl
              type="text"
              placeholder="addressCountry"
              id="Country"
              name="addressCountry"
              value={formData.addressCountry}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            {label && <Form.Label>State</Form.Label>}
            <FormControl
              type="text"
              placeholder="State"
              id="addressState"
              name="addressState"
              value={formData.addressState}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            {label && <Form.Label>District</Form.Label>}
            <FormControl
              type="text"
              placeholder="District"
              id="addressDistrict"
              name="addressDistrict"
              value={formData.addressDistrict}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            {label && <Form.Label>District Registraion Number</Form.Label>}

            <FormControl
              type="text"
              placeholder="District registration number"
              id="districtRegistrationNumber"
              name="districtRegistrationNumber"
              value={formData.districtRegistrationNumber}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            {label && <Form.Label>Password</Form.Label>}
            <FormControl
              type="password"
              placeholder="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            {label && <Form.Label>Confirm Password</Form.Label>}
            <FormControl
              type="text"
              placeholder="confirmPassword"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          {update ? (
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="warning"
              size="sm"
            >
              Update
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="warning"
                size="sm"
              >
                SignUp
              </Button>
              <label>
                Already have account
                <span>
                  <Button variant="warning" size="sm" onClick={handleLogin}>
                    Login
                  </Button>
                </span>
              </label>
            </>
          )}
          <Modal show={show} onHide={handleClose}>
            {/* <Modal.Header closeButton>
              <Modal.TitleModal.Title>
            </Modal.Header> */}
            <Modal.Body>
              "User already exists, Click ok to login , click Cancel to use
              different email"
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Form>
    </Container>
  );
}

export default SignUp;
