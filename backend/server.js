import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

// Restringe CORS para origens locais em desenvolvimento
// Em produção, substitua por: origin: 'https://seudominio.com'
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "*",
  methods: ["GET", "POST"],
}));

app.use(express.json({ limit: "50kb" }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Servidor VoaAM funcionando!");
});

app.post("/corrigir-redacao", async (req, res) => {
  try {
    const { tema, texto } = req.body;

    // Validação de entrada
    if (!tema || typeof tema !== "string" || tema.trim().length === 0) {
      return res.status(400).json({ resultado: "Erro: tema inválido ou ausente." });
    }
    if (!texto || typeof texto !== "string" || texto.trim().length < 50) {
      return res.status(400).json({ resultado: "Erro: texto muito curto. Mínimo de 50 caracteres." });
    }
    if (texto.length > 10000) {
      return res.status(400).json({ resultado: "Erro: texto muito longo. Máximo de 10.000 caracteres." });
    }

    const prompt = `Você é um corretor profissional de redações ENEM.

Tema:
${tema.trim()}

Redação:
${texto.trim()}

Faça uma correção estruturada com:
- Nota geral (0 a 1000)
- Avaliação por competência (1 a 5):
  - Competência 1: Domínio da língua escrita
  - Competência 2: Compreensão da proposta
  - Competência 3: Argumentação
  - Competência 4: Coesão textual
  - Competência 5: Proposta de intervenção
- Principais erros gramaticais
- Análise de coerência e coesão
- Sugestões de melhoria
- Avaliação da proposta de intervenção`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ resultado: response.text });
  } catch (erro) {
    console.error("[VoaAM] Erro ao corrigir redação:", erro);
    res.status(500).json({
      resultado: "Erro interno ao processar a redação. Tente novamente.",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor VoaAM rodando na porta ${PORT}`);
});
