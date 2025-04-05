import { useState } from "react";
import axios from "axios";

function UploadPage() {
  const [file, setFile] = useState(null); // ✅ state for selected file

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/api/upload", formData);
      console.log(res.data);
      alert("Uploaded: " + res.data.filename); // ✅ filename should be present
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
