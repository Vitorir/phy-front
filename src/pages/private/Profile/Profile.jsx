import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import MeasureFormsTable from '../../../components/MeasureFormsTable';
import ExerciseFormsTable from '../../../components/ExerciseFormsTable';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';

const ProfilePage = () => {
    const { id } = useParams();
    const [patientProfile, setPatientProfile] = useState(null);
    const [professionalProfile, setProfessionalProfile] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                // Fetch patient profile
                const patientResponse = await axios.get(`http://localhost:3000/patients/:${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const patientData = patientResponse.data;
                setPatientProfile(patientData);
                console.log('Patient Data:', patientData);

                // Fetch professional profile
                const professionalResponse = await axios.get(`http://localhost:3000/professionals/:${patientData.professionalId}`);
                const professionalData = professionalResponse.data;
                setProfessionalProfile(professionalData);
                console.log('Professional Data:', professionalData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUser();
    }, [id]);

    if (!patientProfile || !professionalProfile) {
        return <Text>Carregando...</Text>;
    }

    return (
        <Container maxW="6xl" mt={10} bg="white" p={4} borderRadius="md" boxShadow="md">
            <Heading as="h1" mb={4} >Perfil do Paciente</Heading>
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
                    <Heading as="h2" mb={4} color="blue.200">Fichas de Medida</Heading>
                    <Button as={Link} to={`/measuresheet/${id}`} leftIcon={<AddIcon />} colorScheme="blue" mb={4}>
                        Adicionar Ficha de Medida
                    </Button>
                    <MeasureFormsTable id={id} />
                </Box>

                <Box flex="1" ml={4}>
                    <Heading as="h2" mb={4} color="blue.200">Fichas de Treino</Heading>
                    <Button as={Link} to={`/exercisesheet/${id}`} leftIcon={<AddIcon />} colorScheme="blue" mb={4}>
                        Adicionar Ficha de Treino
                    </Button>
                    <ExerciseFormsTable id={id} />
                </Box>
            </Flex>
        </Container>
    );
};

export default ProfilePage;
