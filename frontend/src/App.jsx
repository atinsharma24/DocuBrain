import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  useToast,
  Link as ChakraLink
} from '@chakra-ui/react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import UploadPage from "./pages/UploadPage";
import Ask from './pages/Ask';
import RawQuery from './pages/RawQuery';
import Dashboard from './pages/Dashboard';

console.log("App component loaded!");

function App() {
  return (
    <Router>
      <Box minH="100vh" bg="gray.50" color="gray.800" p={4}>
        <Box
          as="nav"
          bg="teal.500"
          color="white"
          px={6}
          py={4}
          mb={6}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="md"
        >
          <Heading size="md">DocuBrain</Heading>
          <HStack spacing={4}>
            <Link to="/">Dashboard</Link>
            <Link to="/upload">Upload</Link>
            <Link to="/ask">Ask</Link>
            <Link to="/raw">Raw</Link>
          </HStack>
        </Box>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/raw" element={<RawQuery />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
