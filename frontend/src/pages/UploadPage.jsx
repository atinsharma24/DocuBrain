import { useState } from "react";
import axios from "axios";

function UploadPage() {
  const [file, setFile] = useState(null);

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await axios.post("http://localhost:8000/api/upload", formData);
//       alert("Uploaded: " + res.data.info);
//     } catch (err) {
//       alert("Upload failed");
//       console.error(err);
//     }
//   };

const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const res = await axios.post('http://localhost:8000/api/upload', formData);
      console.log(res.data); // ✅ see full response
      alert("Uploaded: " + res.data.filename); // ✅ works now!
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }
  };
  
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Document</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadPage;
Uploaded: undefined