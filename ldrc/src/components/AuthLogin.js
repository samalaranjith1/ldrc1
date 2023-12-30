import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";

function AuthLogin() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/auth/login");
    handleClose();
  };
  const imageSrc = [
    "https://res.cloudinary.com/dnma1dqwa/image/upload/v1703920913/ldrcImages/_72b37f75-98f3-468f-bb76-17d32187e73d_gtdj1s.jpg",
    "https://res.cloudinary.com/dnma1dqwa/image/upload/v1703920911/ldrcImages/_8e2af832-f3c4-4801-aa79-061945e46066_me8rpx.jpg",
    "https://res.cloudinary.com/dnma1dqwa/image/upload/v1703920908/ldrcImages/_6e7bcc25-0027-47c7-8df3-b8db8b6ea00b_xtywlj.jpg",
    "https://res.cloudinary.com/dnma1dqwa/image/upload/v1703920906/ldrcImages/_39793c24-07d6-4af7-8e7d-a045dd0a9ace_pyeqv3.jpg",
    "https://res.cloudinary.com/dnma1dqwa/image/upload/v1703920904/ldrcImages/_0c1eba83-0b63-4d24-91dc-44da7905b129_v8dnqu.jpg",
    "https://res.cloudinary.com/dnma1dqwa/image/upload/v1703920899/ldrcImages/_e1402bd5-6cc3-488e-a3de-5b9f29c1b7a4_cg6ill.jpg",
    "https://res.cloudinary.com/dnma1dqwa/image/upload/v1703920893/ldrcImages/_b6adff24-ccdd-49c5-b4ef-38b70c1e52de_faqbjr.jpg",
    "https://res.cloudinary.com/dnma1dqwa/image/upload/v1703920886/ldrcImages/_f94d915f-a89e-4fcf-8223-2b199f198b21_hho65s.jpg",
  ];

  const randomImageSrc = imageSrc[Math.floor(Math.random() * imageSrc.length)];
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          {/* <Modal.Title>Login</Modal.Title> */}
        {/* </Modal.Header> */}
        <Modal.Body>
          <Image src={randomImageSrc} thumbnail onClick={handleLogin} />
          {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AuthLogin;
