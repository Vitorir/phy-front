import React, { useState } from 'react';
import {
  Container,
  Box,
  Heading,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    // Adicione mais usuários conforme necessário
  ]);

  const handleSearch = () => {
    // Simular a filtragem dos usuários com base no termo de pesquisa
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSearchResults(users);
  };

  const [searchResults, setSearchResults] = useState(users);

  // Exibir todos os usuários por padrão
  useState(() => {
    setSearchResults(users);
  }, []);

  return (
    <Container maxW="xl" mt={10}>
      <Heading as="h1" mb={4} color={'blue.200'}>Pesquisar Usuários</Heading>
      <Box mb={4}>
        <Input
          placeholder="Digite o nome ou email do usuário"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button ml={4} colorScheme="blue" onClick={handleSearch}>Pesquisar</Button>
        <Button ml={2} colorScheme="gray" onClick={handleReset}>Resetar</Button>
      </Box>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Idade</Th>
          </Tr>
        </Thead>
        <Tbody>
          {searchResults.map((result) => (
            <Tr key={result.id}>
              <Td>{result.name}</Td>
              <Td>{result.email}</Td>
              <Td>{result.age}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default SearchPage;
