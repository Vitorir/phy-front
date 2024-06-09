// server.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const CryptoJS = require('crypto-js');
const app = express();
const port = 3000;

const secretKey = 'your-secret-key';

// Função para criptografar IDs
const encryptId = (id) => {
  return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
};

// Simular dados
const patients = [
  {
    id: encryptId(1),
    name: "João Silva",
    birthdate: "1990-01-01",
    gender: "masculino",
    email: "joaosilva@example.com",
    senha: "senhaSegura123",
    role: "Client",
    objectives: "Melhorar condição física",
    observations: "Preferência por atividades ao ar livre",
    injuries: "Nenhuma",
    diabetes_indicator: false,
    smoking_indicator: false,
    joint_problem_indicator: false,
    loss_of_consciousness_indicator: false,
    chest_pain_indicator: false,
    professionalId: encryptId(1)
  },
  {
    id: encryptId(2),
    name: "Maria Oliveira",
    birthdate: "1985-02-15",
    gender: "feminino",
    email: "mariaoliveira@example.com",
    senha: "senhaSegura456",
    role: "Client",
    objectives: "Aumentar resistência",
    observations: "Prefere exercícios indoor",
    injuries: "Lesão no joelho",
    diabetes_indicator: false,
    smoking_indicator: false,
    joint_problem_indicator: true,
    loss_of_consciousness_indicator: false,
    chest_pain_indicator: false,
    professionalId: encryptId(2)
  }
];

const professionals = [
  {
    id: encryptId(1),
    name: "Dr. Carlos Pereira",
    email: "drcarlos@example.com",
    specialty: "Cardiologia"
  },
  {
    id: encryptId(2),
    name: "Dra. Ana Costa",
    email: "draana@example.com",
    specialty: "Endocrinologia"
  }
];

// Rota para buscar todos os pacientes
app.get('/patients', (req, res) => {
  res.json(patients);
});

// Rota para buscar paciente por ID criptografado
app.get('/patients/:id', (req, res) => {
  const decryptedId = CryptoJS.AES.decrypt(req.params.id, secretKey).toString(CryptoJS.enc.Utf8);
  const patient = patients.find(p => p.id === req.params.id);
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }
  res.json(patient);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
