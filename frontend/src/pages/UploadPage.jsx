import { useState } from "react";
import axios from "axios";
import "./UploadPage.css";

const UploadPage = () => {
  const [schemeFile, setSchemeFile] = useState(null);
  const [facultyFile, setFacultyFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!schemeFile || !facultyFile) {
      setMessage("Please select both files.");
      return;
    }

    const formData = new FormData();
    formData.append("scheme", schemeFile);
    formData.append("preferences", facultyFile);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "processed_allotment.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage("File processed successfully. Downloading...");
    } catch (error) {
      setMessage("Upload failed");
    }
  };

  return (
    <main className="upload-container">
      <div className="upload-box">
        <h2 className="upload-title">Upload Excel Files</h2>

        <label className="upload-label">Upload Scheme File:</label>
        <input
          type="file"
          className="upload-input"
          onChange={(e) => setSchemeFile(e.target.files[0])}
        />

        <label className="upload-label">Upload Faculty Preferences File:</label>
        <input
          type="file"
          className="upload-input"
          onChange={(e) => setFacultyFile(e.target.files[0])}
        />

        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>

        <p>{message}</p>
      </div>
    </main>
  );
};

export default UploadPage;