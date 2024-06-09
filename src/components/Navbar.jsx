import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import logo from "../assets/img/logo-no-background.svg";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState(true); // Assuming currentUser is boolean
  const navigate = useNavigate();

  return (
    <Box bg={useColorModeValue("white", "blue.200")} py={4}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        maxW="1200px"
        mx="auto"
      >
        <Link to={currentUser ? "/loged-in" : "/"}>
          <Image src={logo} alt="Logo" maxH="40px" />
        </Link>
        <Box display="flex" alignItems="center">
          <Box mr={8}>
            {currentUser ? (
              <>
                <Link to="/chats">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    color="#19CBF3"
                    size="sm"
                    mr={2}
                  >
                    Chat
                  </Button>
                </Link>
                <Link to="/search">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    color="#19CBF3"
                    size="sm"
                    mr={2}
                  >
                    Search
                  </Button>
                </Link>
                <Link to="/measuresheet/">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    color="#19CBF3"
                    size="sm"
                    mr={2}
                  >
                    MeasureSheet
                  </Button>
                </Link>
                <Link to="/exercisesheet/">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    color="#19CBF3"
                    size="sm"
                    mr={2}
                  >
                    ExerciseSheet
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/about">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    color="#19CBF3"
                    size="sm"
                    mr={2}
                  >
                    Sobre
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    color="#19CBF3"
                    size="sm"
                    mr={2}
                  >
                    Contato
                  </Button>
                </Link>
              </>
            )}
          </Box>
          <Box>
            {currentUser ? (
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => setCurrentUser(false)}
              >
                Sair
              </Button>
            ) : (
              <>
                <Link to="/sign-up">
                  <Button
                    variant="outline"
                    color="#19CBF3"
                    size="sm"
                    mr={2}
                  >
                    Cadastrar
                  </Button>
                </Link>
                <Link to="/log-in">
                  <Button
                    variant="outline"
                    color="#19CBF3"
                    size="sm"
                    mr={2}
                  >
                    Entrar
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
