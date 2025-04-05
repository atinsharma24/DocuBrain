import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from "./pages/UploadPage";
import Ask from './pages/Ask';
import RawQuery from './pages/RawQuery';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/raw" element={<RawQuery />} />
      </Routes>
    </Router>
  );
}

export default App;
