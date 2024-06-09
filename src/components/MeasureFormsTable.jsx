import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const MeasureFormsTable = ({ patientId }) => {
    const [measureForms, setMeasureForms] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/measureSheets?patientId=${patientId}`)
            .then(response => response.json())
            .then(data => setMeasureForms(data))
            .catch(error => console.error('Error fetching measure sheets:', error));
    }, [patientId]);

    return (
        <Table variant="striped" colorScheme="blue">
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Data</Th>
                </Tr>
            </Thead>
            <Tbody>
                {measureForms.map((form) => (
                    <Tr key={form.id}>
                        <Td>{form.id}</Td>
                        <Td>{form.date}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default MeasureFormsTable;
