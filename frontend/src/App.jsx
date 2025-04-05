import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UploadPage />
    </div>
  );
}

export default App;



// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileUpload = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert(response.data.info);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div className="App p-4">
//       <h1 className="text-xl font-bold mb-4">DocuBrain File Upload</h1>
//       <form onSubmit={handleFileUpload}>
//         <input
//           type="file"
//           onChange={(e) => setSelectedFile(e.target.files[0])}
//           className="mb-2"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Upload File
//         </button>
//       </form>
//     </div>
//   );
// }

// export default App;
