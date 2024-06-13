import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Flex,
  Heading,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, ChatIcon, EmailIcon } from '@chakra-ui/icons';
import profileimg from '../../../assets/img/profileimage.png';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../services/axios';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axiosInstance.get('/patients')
      .then((response) => {
        const myPatients = response.data.filter((patient) => patient.professionalId === 1);
        setPatients(myPatients);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
        toast({
          title: 'Erro ao carregar pacientes',
          description: 'Não foi possível carregar a lista de pacientes.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });

    axiosInstance.get('/requests')
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching requests:', error);
        toast({
          title: 'Erro ao carregar solicitações',
          description: 'Não foi possível carregar a lista de solicitações.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleAcceptRequest = (request) => {
    axiosInstance.patch(`/requests/${request.id}`)
      .then(() => {
        setRequests(requests.filter((req) => req.id !== request.id));
        toast({
          title: 'Solicitação aceita',
          description: 'A solicitação foi aceita com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error accepting request:', error);
        toast({
          title: 'Erro ao aceitar solicitação',
          description: 'Não foi possível aceitar a solicitação.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Container maxW="100%" p="4" bg="white" borderRadius="10px">
      <Box bg="blue.200" color="white" p="8" mb="8" borderRadius="10px">
        <Flex align="center">
          <Image src={profileimg} alt="Imagem de Perfil" boxSize="100px" borderRadius="full" mr="4" />
          <Box>{/* Conteúdo do perfil */}</Box>
        </Flex>
      </Box>

      <Flex justify="space-between">
        <Box flex="1" mr={4}>
          <Heading as="h2" fontSize="2xl" mb="4" color="blue.200">
            Lista de Pacientes
          </Heading>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patients.map((patient) => (
                <Tr key={patient.id}>
                  <Td>{patient.name}</Td>
                  <Td>{patient.email}</Td>
                  <Td>
                    <Flex>
                      <IconButton onClick={() => navigate(`/loged-in/sheets/${patient.id}`)} bg="blue.200" aria-label="Perimetria" icon={<AddIcon />} mr="2" />
                      <IconButton onClick={() => navigate(`/loged-in/chat/${patient.id}`)} bg="blue.200" aria-label="Chat" icon={<ChatIcon />} mr="2" />
                      <IconButton onClick={() => navigate(`/loged-in/ficha/${patient.id}`)} bg="blue.200" aria-label="Ficha" icon={<EmailIcon />} />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box flex="1" ml={4}>
          <Heading as="h2" fontSize="2xl" mb="4" color="blue.200">
            Lista de Solicitações
          </Heading>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nome do Paciente</Th>
                <Th>Status</Th>
                <Th>Aceitar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map((request) => (
                <Tr key={request.id}>
                  <Td>{request.id}</Td>
                  <Td>{request.patientId}</Td>
                  <Td>{request.status}</Td>
                  <Td>
                    <Button
                      size="sm"
                      bg="blue.200"
                      onClick={() => handleAcceptRequest(request)}
                    >
                      Aceitar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Container>
  );
};

export default Dashboard;
