import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";

function Login() {
  // const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await axios
        .post("http://localhost:8080/auth/login/", {
          email,
          password,
        })
        .then((res) => {
          console.log(res);
          if (res.data === "exist") {
            alert("User successfully logged in");
            navigate("/home", { state: { id: email } });
          } else if (res.data === "invalid_password") {
            alert(
              "Please enter correct password,if you forget password ,please click on forget password"
            );
          } else if (res.data === "notexist") {
            alert("User have not sign up");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (error) {
      console.log("Error occured in login catch block" + error);
    }
  }
  const handleSignup = (e) => {
    navigate("/signup");
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
      <Form inline>
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
          <h2 className="bg-white">Login</h2>
          <FormGroup>
            <FormControl
              type="mail"
              placeholder="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {/* {formData.email &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              formData.email
            ) ? (
              <span></span>
            ) : (
              <span>please enter valid email </span>
            )} */}
          </FormGroup>
          <div style={{ padding: "2px" }}></div>
          <FormGroup>
            <FormControl
              type="password"
              placeholder="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormGroup>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="warning"
            size="sm"
          >
            Login
          </Button>
          <label>
            Don't have account
            <span>
              <Button variant="warning" size="sm" onClick={handleSignup}>
                SignUp
              </Button>
            </span>
          </label>
          <label>
            Reset password
            <span>
              <Button variant="warning" size="sm">
                Forgot Password
              </Button>
            </span>
          </label>
        </div>
      </Form>
      ;
    </Container>
  );
}

export default Login;
