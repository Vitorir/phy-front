import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../../../assets/img/logo-no-background.svg";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [specialization, setSpecialization] = useState("");
  const [activityTime, setActivityTime] = useState(0);
  const [isProfessional, setIsProfessional] = useState(false);
  const navigate = useNavigate();

  const options = ['male', 'female', 'other'];

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      name,
      birthday,
      gender,
      email,
      password,
      role: isProfessional ? "professional" : "user",
      ...(isProfessional && { specialization, activity_time: activityTime }),
    };

    console.log(userData);

    try {
      setLoading(true);
      // const response = await axios.post("http://localhost:3000/users/", userData);
      // console.log(response.data);
      // console.log(userData);

      fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
          name,
          email,
          password,
          password_confirmation: confirmPassword
          }
        })
      }).then((response) => {
        console.log(response);
        return response.json();
      }).then((json) => {
        console.log(json);
        return json;
      })

      // Navegar para a página de login após cadastro bem-sucedido
      navigate("/log-in");
    } catch (error) {
      console.error(error);
      setError("Failed to sign up");
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
        <Image
          borderRadius="full"
          boxSize="175px"
          src={logo}
          alt="Logo"
        />
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          {error && (
            <Text color="red.500" mb={4} textAlign="center">
              {error}
            </Text>
          )}
          <FormControl id="name" mb={4}>
            <FormLabel>Nome Completo</FormLabel>
            <Input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
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
          <FormControl id="confirmPassword" mb={4}>
            <FormLabel>Confirme sua senha</FormLabel>
            <Input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="birthday" mb={4}>
            <FormLabel>Data de Nascimento</FormLabel>
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </FormControl>
          <FormControl id="gender" mb={4}>
            <FormLabel>Gênero</FormLabel>
            <Select
              placeholder="Selecione"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <Checkbox
              id="isProfessional"
              isChecked={isProfessional}
              onChange={() => setIsProfessional(!isProfessional)}
              marginRight={5}
            >
              Profissional
            </Checkbox>
          </FormControl>
          {isProfessional && (
            <>
              <FormControl id="specialization" mb={4}>
                <FormLabel>Especialidade</FormLabel>
                <Input
                  type="text"
                  placeholder="Sua especialidade"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </FormControl>
              <FormControl id="activityTime" mb={4}>
                <FormLabel>Tempo de Atividade (anos)</FormLabel>
                <Input
                  type="number"
                  placeholder="Anos de atividade"
                  value={activityTime}
                  onChange={(e) => setActivityTime(e.target.value)}
                />
              </FormControl>
            </>
          )}
          <Stack direction="row" spacing={4} mt={8} justify="center">
            <Button
              type="submit"
              bg={"blue.200"}
              color={"white"}
              isLoading={loading}
              loadingText="Cadastrando..."
            >
              Cadastrar
            </Button>
            <Link to="/log-in">
              <Button colorScheme="blue" variant="outline">
                Login
              </Button>
            </Link>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
