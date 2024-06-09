import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, useColorModeValue, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../../assets/img/logo-no-background.svg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      // Requisição para API
      const response = await axios.post('http://localhost:3000/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);

      const { token } = response.data;

      // Verifique se 'token' está presente na resposta da API
      console.log(token);

      // Armazenar o token de acesso no localStorage
      localStorage.setItem('token', token);

      // Redirecionar para a página dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(`Erro ao fazer login! Erro: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={8}
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      bg={useColorModeValue("white", "blue.200")}
    >
      <Box display="flex" justifyContent="center">
        <Image borderRadius="full" boxSize="175px" src={logo} alt="Logo" />
      </Box>
      <Box textAlign="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Physicare</Text>
        <Text fontSize="md">Faça o login para começar a utilizar nossos serviços</Text>
      </Box>
      <form onSubmit={handleSubmit}>
        {error && (
          <Text color="red.500" mb={4} textAlign="center">
            {error}
          </Text>
        )}
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack direction="row" spacing={4} mt={8} justify="center">
          <Button
            type="submit"
            bg={"blue.200"}
            color={"white"}
            isLoading={loading}
            loadingText="Logando..."
          >
            Login
          </Button>
          <Link to="/sign-up">
            <Button colorScheme="blue" variant="outline">
              Cadastrar-se
            </Button>
          </Link>
        </Stack>
      </form>
    </Box>
  );
}
