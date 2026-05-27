import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { GoogleGenAI }
from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.post("/corrigir-redacao", async (req, res) => {

  try {

    const { tema, texto } = req.body;

    const prompt = `
Você é um corretor profissional
de redações ENEM.

Tema:
${tema}

Redação:
${texto}

Faça:
- nota geral
- competências
- erros gramaticais
- coerência
- sugestões
- proposta de intervenção
`;

    const response =
      await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt

      });

    res.json({
      resultado: response.text
    });

  } catch (erro) {

    console.log(erro);

    res.status(500).json({
      resultado:
        "Erro ao corrigir redação."
    });

  }

});

app.listen(3000, () => {
  console.log(
    "Servidor rodando na porta 3000"
  );
});