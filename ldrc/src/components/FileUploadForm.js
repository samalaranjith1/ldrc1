import React, { useState } from "react";
import axios from "axios";

const FileUploadForm = () => {
  const [textValue, setTextValue] = useState("");
  const [file, setFile] = useState(null);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {};
    formData.text = textValue;
    formData.file = file;
    // const formData = new FormData();
    // formData.append("text", textValue);
    // formData.append("file", file);
    console.log(formData);

    try {
      await axios
        .post("http://localhost:8080/fileupload1", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("hi");
          const data = response.json();
          console.log("Response:", data);
        })
        .catch((error) => {
          alert("wrong details");
          console.log(error.response.data);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Text Input:</label>
        <input
          type="text"
          id="text"
          value={textValue}
          onChange={handleTextChange}
        />
      </div>
      <div>
        <label htmlFor="file">File Input:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default FileUploadForm;
