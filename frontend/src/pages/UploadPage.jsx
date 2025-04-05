// src/pages/UploadPage.jsx
// import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';

import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  Spinner,
} from '@chakra-ui/react';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast({
          title: "Upload successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setFile(null);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast({
        title: "Upload failed.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt={12} p={6} bg="white" borderRadius="md" boxShadow="md">
      <VStack spacing={5}>
        <Heading size="lg" color="teal.600">📄 Upload Document</Heading>
        <Text fontSize="md" color="gray.600">Supported formats: PDF, TXT, DOCX</Text>
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.txt,.docx"
        />
        <Button
          colorScheme="teal"
          onClick={handleUpload}
          isDisabled={uploading}
          w="full"
        >
          {uploading ? <Spinner size="sm" /> : "Upload"}
        </Button>
      </VStack>
    </Box>
  );
};

export default UploadPage;
