import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect } from "react";
import ContactUs from "./components/ContactUs";
import BottomFooter from "./components/BottomFooter";
import PaymentDetails from "./components/PaymentDetails";
import Search from "./components/Search";
import DriverRegistration from "./components/DriverRegistration";
import FileUploadForm from "./components/FileUploadForm";

function App() {
  const handleResize = () => {
    if (window.innerWidth < 720) {
      // alert("Please use window width more than 720px for better experience");
      window.resizeTo(725, "auto");
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  return (
    <Router>
      <Navigation />
      <Routes>
        {/* <Route path="/" element={<Navigation />} /> */}
        <Route exact path="/home" element={<Home />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/driverregistration" element={<DriverRegistration />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/paymentdetails" element={<PaymentDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/fileupload1" element={<FileUploadForm />} />
      </Routes>
      <BottomFooter style={{ position: "fixed", bottom: "5px" }} />
    </Router>
  );
}

export default App;
