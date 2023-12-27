import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Flex,
  Spacer,
} from '@chakra-ui/react';

const ServiceTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    rate: '',
    time: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevService) => ({ ...prevService, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewService((prevService) => ({ ...prevService, image: file }));
  };

  const handleAddService = () => {
    setServices((prevServices) => [...prevServices, newService]);
    setIsModalOpen(false);
    setNewService({ name: '', rate: '', time: '', image: null });
  };

  return (
    <Box bg="white" p={4} mt={5} overflowX="auto">
      <Flex direction={{ base: 'column', md: 'row' }} p={4}>
        <Spacer />
        <Flex direction={{ base: 'column', md: 'row' }} align="center">
          <Input type="text" colorScheme='black' placeholder="Search" mb={{ base: 2, md: 0 }} />
          <Button colorScheme="blue" mr={2} mb={{ base: 2, md: 0 }}>
            Search
          </Button>
          <Button colorScheme="green" onClick={() => setIsModalOpen(true)}>
            Add Service
          </Button>
        </Flex>
      </Flex>

      <Box overflowX="auto">
        <Table variant="striped" colorScheme="black" mt={4}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Rate</Th>
              <Th>Time</Th>
              <Th>Image</Th>
            </Tr>
          </Thead>
          <Tbody>
            {services.map((service, index) => (
              <Tr key={index}>
                <Td>{service.name}</Td>
                <Td>{service.rate}</Td>
                <Td>{service.time}</Td>
                <Td>
                  {service.image && (
                    <img
                      src={URL.createObjectURL(service.image)}
                      alt={`Service ${index}`}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add Service Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* ... (unchanged modal content) */}
      </Modal>
    </Box>
  );
};

export default ServiceTable;
