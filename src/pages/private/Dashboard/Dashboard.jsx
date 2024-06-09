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

export const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [requests, setRequests] = useState([]);

  // Função para aceitar uma solicitação de paciente
  const handleAcceptRequest = (requestId) => {
    // Encontrar a solicitação correspondente
    const acceptedRequest = requests.find(request => request.id === requestId);
    if (!acceptedRequest) return;

    // Atualizar o estado local removendo a solicitação
    setRequests(requests.filter(request => request.id !== requestId));

    // Criar um novo paciente com base na solicitação aceita
    const newPatient = {
      id: acceptedRequest.id,
      name: acceptedRequest.patientName,
      email: `${acceptedRequest.patientName.replace(/\s/g, '').toLowerCase()}@example.com`, // Gerar um e-mail baseado no nome do paciente (para fins de simulação)
      role: "Client",
      professionalId: 1 // O Dr. Carlos Pereira é o profissional responsável por todos os pacientes aceitos
    };

    // Atualizar o estado local adicionando o novo paciente
    setPatients([...patients, newPatient]);

    // Aqui você faria a requisição para atualizar os dados no banco de dados com o novo paciente
    // Por enquanto, vamos apenas exibir no console
    console.log(`Solicitação ${requestId} aceita. Novo paciente:`, newPatient);
  };

  useEffect(() => {
    // Aqui você faria a busca dos dados dos pacientes e das solicitações na sua API
    // No momento, vou simular os dados usando os dados fornecidos

    // Simular dados dos pacientes
    const patientsData = [
      {
        id: 1,
        name: "João Silva",
        email: "joaosilva@example.com",
        role: "Client",
        professionalId: 1 // O Dr. Carlos Pereira é o profissional responsável por João Silva
      },
      // Não há necessidade de incluir Maria Oliveira aqui, pois ela estará na lista de solicitações
    ];

    // Simular dados das solicitações
    const requestsData = [
      {
        id: 1,
        patientName: "Maria Oliveira",
        condition: "Fever"
      }
    ];

    // Filtrar os pacientes que são seus e as solicitações de pacientes que ainda não são seus pacientes
    const myPatients = patientsData.filter(patient => patient.professionalId === 1);
    const myRequests = requestsData.filter(request => !myPatients.find(patient => patient.name === request.patientName));

    // Atualizar o estado com os dados filtrados
    setPatients(myPatients);
    setRequests(myRequests);
  }, []); // A lista de dependências está vazia, então useEffect só será executado uma vez, após a montagem do componente

  return (
    <Container maxW="100%" p="4" bg={'white'} borderRadius={'10px'}>
      {/* Seção de Perfil */}
      <Box bg="blue.200" color="white" p="8" mb="8" borderRadius={'10px'}>
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
          <Heading as="h2" fontSize="2xl" mb="4" color={'blue.200'}>Lista de Pacientes</Heading>
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
                      <IconButton onClick={() => redirecionarPerimetria(patient)} bg={'blue.200'} aria-label="Perimetria" icon={<AddIcon />} mr="2" />
                      <IconButton onClick={() => navigate('/loged-in/chat')} bg={'blue.200'} aria-label="Chat" icon={<ChatIcon />} mr="2" />
                      <IconButton onClick={() => redirecionarTreino(patient)} bg={'blue.200'} aria-label="Ficha" icon={<EmailIcon />} />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        
        {/* Tabela de Solicitações */}
        <Box flex="1" ml={4}>
          <Heading as="h2" fontSize="2xl" mb="4" color={'blue.200'}>Lista de Solicitações</Heading>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nome do Paciente</Th>
                <Th>Condição</Th>
                <Th>Aceitar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map((request) => (
                <Tr key={request.id}>
                  <Td>{request.id}</Td>
                  <Td>{request.patientName}</Td>
                  <Td>{request.condition}</Td>
                  <Td>
                    <Button
                      size="sm"
                      bg={'blue.200'}
                      onClick={() => handleAcceptRequest(request.id)}
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
