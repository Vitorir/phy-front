// src/pages/private/Chat/Chat.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { patientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const toast = useToast();

  useEffect(() => {
    // Fetch initial chat messages for the patient from the API
    fetch(`http://localhost:3000/chatMessages?patientId=${patientId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setMessages(data))
      .catch((error) => {
        console.error('Error fetching chat messages:', error);
        toast({
          title: 'Erro ao carregar mensagens',
          description: 'Não foi possível carregar as mensagens do chat.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [patientId, toast]);

  const handleSendMessage = () => {
    const message = {
      patientId,
      sender: 'Dr. Carlos Pereira',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    // Save the new message to the API
    fetch('http://localhost:3000/chatMessages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((savedMessage) => {
        setMessages([...messages, savedMessage]);
        setNewMessage('');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        toast({
          title: 'Erro ao enviar mensagem',
          description: 'Não foi possível enviar a mensagem.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Container maxW="container.md" p="4" bg="white" borderRadius="10px">
      <Heading as="h2" fontSize="2xl" mb="4" color="blue.200">
        Chat com Paciente
      </Heading>
      <Box bg="gray.100" p="4" borderRadius="10px" mb="4">
        <List spacing={3}>
          {messages.map((msg, index) => (
            <ListItem key={index} bg="white" p="3" borderRadius="10px">
              <Text fontWeight="bold">{msg.sender}</Text>
              <Text>{msg.content}</Text>
              <Text fontSize="xs" color="gray.500">
                {new Date(msg.timestamp).toLocaleString()}
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>
      <Flex>
        <Input
          placeholder="Digite sua mensagem"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button ml="2" onClick={handleSendMessage} bg="blue.200">
          Enviar
        </Button>
      </Flex>
    </Container>
  );
};

export default Chat;
