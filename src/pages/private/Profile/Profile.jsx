import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import MeasureFormsTable from '../../../components/MeasureFormsTable';
import ExerciseFormsTable from '../../../components/ExerciseFormsTable';
import { AddIcon } from '@chakra-ui/icons';

const ProfilePage = () => {
    const { patientId } = useParams();
    const [patientProfile, setPatientProfile] = useState(null);
    const [professionalProfile, setProfessionalProfile] = useState(null);

    useEffect(() => {
        // Fetch patient profile
        fetch(`http://localhost:3000/patients/${patientId}`)
            .then(response => response.json())
            .then(data => {
                setPatientProfile(data);
                // Fetch professional profile
                return fetch(`http://localhost:3000/professionals/${data.professionalId}`);
            })
            .then(response => response.json())
            .then(professionalData => setProfessionalProfile(professionalData))
            .catch(error => console.error('Error fetching data:', error));
    }, [patientId]);

    if (!patientProfile || !professionalProfile) {
        return <Text>Carregando...</Text>;
    }

    return (
        <Container maxW="6xl" mt={10} bg="white" p={4} borderRadius="md" boxShadow="md">
            <Heading as="h1" mb={4}>Perfil do Paciente</Heading>
            <Box display="flex" alignItems="center" mb={8}>
                <Box mr={8}>
                    <img src="https://via.placeholder.com/150" alt="Avatar do Paciente" style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
                </Box>
                <Box>
                    <Text><strong>Nome:</strong> {patientProfile.name}</Text>
                    <Text><strong>Email:</strong> {patientProfile.email}</Text>
                    <Text><strong>Data de Nascimento:</strong> {patientProfile.birthdate}</Text>
                    <Text><strong>Objetivo:</strong> {patientProfile.objectives}</Text>
                    <Text><strong>Profissional:</strong> {professionalProfile.name}</Text>
                </Box>
            </Box>

            <Flex>
                <Box flex="1" mr={4}>
                    <Heading as="h2" mb={4} color="blue.600">Fichas de Medida</Heading>
                    <Button as={Link} to={`/measuresheet/${patientId}`} leftIcon={<AddIcon />} colorScheme="blue" mb={4}>
                        Adicionar Ficha de Medida
                    </Button>
                    <MeasureFormsTable patientId={patientId} />
                </Box>

                <Box flex="1" ml={4}>
                    <Heading as="h2" mb={4} color="blue.600">Fichas de Treino</Heading>
                    <Button as={Link} to={`/exercisesheet/${patientId}`} leftIcon={<AddIcon />} colorScheme="blue" mb={4}>
                        Adicionar Ficha de Treino
                    </Button>
                    <ExerciseFormsTable patientId={patientId} />
                </Box>
            </Flex>
        </Container>
    );
};

export default ProfilePage;
