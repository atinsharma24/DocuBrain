import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    HStack,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Divider,
    Icon,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { FaUpload, FaQuestion, FaCode, FaFileAlt } from 'react-icons/fa';
  import { Link } from 'react-router-dom';
  
  const Dashboard = () => {
    const cardBg = useColorModeValue("white", "gray.800");
    const cardShadow = useColorModeValue("md", "dark-lg");
  
    return (
      <Box>
        <VStack align="start" spacing={6}>
          {/* Welcome Text */}
          <Box>
            <Heading size="lg" color="teal.600">Welcome back to DocuBrain 🧠</Heading>
            <Text color="gray.600" mt={2}>Your personal document assistant, powered by AI.</Text>
          </Box>
  
          {/* Stats */}
          <SimpleGrid columns={[1, 2, 3]} spacing={6} w="full">
            <Stat p={4} bg={cardBg} shadow={cardShadow} borderRadius="xl">
              <StatLabel>Total Documents</StatLabel>
              <StatNumber>12</StatNumber>
              <StatHelpText>Updated just now</StatHelpText>
            </Stat>
            <Stat p={4} bg={cardBg} shadow={cardShadow} borderRadius="xl">
              <StatLabel>Last Upload</StatLabel>
              <StatNumber>Apr 5</StatNumber>
              <StatHelpText>10:42 AM</StatHelpText>
            </Stat>
            <Stat p={4} bg={cardBg} shadow={cardShadow} borderRadius="xl">
              <StatLabel>Storage Used</StatLabel>
              <StatNumber>128 MB</StatNumber>
              <StatHelpText>Out of 1 GB</StatHelpText>
            </Stat>
          </SimpleGrid>
  
          {/* Divider */}
          <Divider />
  
          {/* Recent Files */}
          <Box w="full">
            <Heading size="md" mb={3}>📄 Recent Documents</Heading>
            <VStack align="start" spacing={2}>
              <Text><Icon as={FaFileAlt} color="gray.500" /> summary_notes.pdf</Text>
              <Text><Icon as={FaFileAlt} color="gray.500" /> project_plan.docx</Text>
              <Text><Icon as={FaFileAlt} color="gray.500" /> thoughts.txt</Text>
            </VStack>
          </Box>
  
          {/* Quick Actions */}
          <Box w="full">
            <Heading size="md" mb={3}>⚡ Quick Actions</Heading>
            <HStack spacing={4}>
              <Link to="/upload">
                <Button leftIcon={<FaUpload />} colorScheme="teal">Upload Document</Button>
              </Link>
              <Link to="/ask">
                <Button leftIcon={<FaQuestion />} colorScheme="blue">Ask a Question</Button>
              </Link>
              <Link to="/raw">
                <Button leftIcon={<FaCode />} colorScheme="purple">Raw Query</Button>
              </Link>
            </HStack>
          </Box>
        </VStack>
      </Box>
    );
  };
  
  export default Dashboard;
  