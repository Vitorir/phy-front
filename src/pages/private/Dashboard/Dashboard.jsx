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
} from "@chakra-ui/react";
import { AddIcon, ChatIcon, EmailIcon } from "@chakra-ui/icons";
import profileimg from '../../../assets/img/profileimage.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../../services/axios';

export const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientsAndRequests = async () => {
      try {
        const { data: patientsData } = await axiosInstance.get('/patients');
        const { data: professionalsData } = await axiosInstance.get('/professionals');

        const requestsData = patientsData.filter(patient => !patient.professionalId);

        setPatients(patientsData);
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchPatientsAndRequests();
  }, []);

  const handleAcceptRequest = async (patient) => {
    try {
      const updatedPatient = { ...patient, professionalId: patients[0]?.professionalId };
      await axiosInstance.put(`/patients/${patient.id}`, updatedPatient);

      setRequests(requests.filter(request => request.id !== patient.id));
      setPatients(patients.map(p => p.id === patient.id ? updatedPatient : p));
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  return (
    <Container maxW="100%" p="4" bg="white" borderRadius="10px">
      {/* Seção de Perfil */}
      <Box bg="blue.200" color="white" p="8" mb="8" borderRadius="10px">
        <Flex align="center">
          <Image src={profileimg} alt="Imagem de Perfil" boxSize="100px" borderRadius="full" mr="4" />
          <Box>
            {/* Conteúdo do perfil */}
          </Box>
        </Flex>
      </Box>

      {/* Tabelas de Pacientes e Solicitações */}
      <Flex justify="space-between">
        {/* Tabela de Pacientes */}
        <Box flex="1" mr={4}>
          <Heading as="h2" fontSize="2xl" mb="4" color="blue.200">Lista de Pacientes</Heading>
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
                  <Td onClick={() => navigate(`/profile/${patient.id}`)} style={{ cursor: 'pointer' }}>{patient.name}</Td>
                  <Td>{patient.email}</Td>
                  <Td>
                    <Flex>
                      <IconButton
                        onClick={() => navigate(`/measuresheet/${patient.id}`)}
                        bg="blue.200"
                        aria-label="Perimetria"
                        icon={<AddIcon />}
                        mr="2"
                      />
                      <IconButton
                        onClick={() => navigate('/loged-in/chat')}
                        bg="blue.200"
                        aria-label="Chat"
                        icon={<ChatIcon />}
                        mr="2"
                      />
                      <IconButton
                        onClick={() => navigate(`/exercisesheet/${patient.id}`)}
                        bg="blue.200"
                        aria-label="Ficha"
                        icon={<EmailIcon />}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        
        {/* Tabela de Solicitações */}
        <Box flex="1" ml={4}>
          <Heading as="h2" fontSize="2xl" mb="4" color="blue.200">Lista de Solicitações</Heading>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Nome do Paciente</Th>
                <Th>Email</Th>
                <Th>Aceitar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map((request) => (
                <Tr key={request.id}>
                  <Td>{request.name}</Td>
                  <Td>{request.email}</Td>
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
