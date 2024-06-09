import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const ExerciseFormsTable = ({ patientId }) => {
    const [exerciseForms, setExerciseForms] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/exerciseSheets?patientId=${patientId}`)
            .then(response => response.json())
            .then(data => setExerciseForms(data))
            .catch(error => console.error('Error fetching exercise sheets:', error));
    }, [patientId]);

    return (
        <Table variant="striped" colorScheme="blue">
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Objetivo</Th>
                    <Th>Data de Criação</Th>
                </Tr>
            </Thead>
            <Tbody>
                {exerciseForms.map((form) => (
                    <Tr key={form.id}>
                        <Td>{form.id}</Td>
                        <Td>{form.objective}</Td>
                        <Td>{form.creationDate}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default ExerciseFormsTable;
