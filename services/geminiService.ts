import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Restaurant } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const restaurantSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      description: { type: Type.STRING },
      cuisine: { type: Type.STRING },
      priceRange: { type: Type.STRING, description: "e.g. $, $$, $$$" },
    },
    required: ["name", "description", "cuisine", "priceRange"],
  },
};

export const getLocalRecommendations = async (location: string): Promise<Restaurant[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Recommend 3 charming restaurants in ${location} suitable for couples or families staying at a cozy alpine inn. Focus on Fondue, Trout (Truta), or Italian cuisine typical of the region.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: restaurantSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as Restaurant[];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};

export const chatWithConcierge = async (message: string, history: string[]): Promise<string> => {
    try {
        const model = "gemini-2.5-flash";
        const systemInstruction = `
        Você é a recepcionista virtual da 'Pousada Villa Verde' em Monte Verde, MG (a Suíça Mineira).
        Seu tom é sofisticado, acolhedor e "srrano" (use emojis de frio, vinho, lareira).
        
        Informações da Pousada e Região:
        - Clima: Geralmente frio à noite. Temos aquecedores e lareira em todos os chalés.
        - Café da Manhã: Estilo colonial mineiro servido das 08h30 às 11h30 (inclui pão de queijo e strudel).
        - Wi-Fi: VillaVerde_Guest (Senha: monteverde2024).
        - Lareira: A primeira cesta de lenha é cortesia. Cesta extra: R$ 45,00.
        - Atrações Locais: Trilha da Pedra Redonda, Patinação no Gelo, Fábricas de Chocolate e Orquidário.
        - Check-out: Até às 12h.
        
        Mantenha as respostas concisas (máximo 40 palavras) para leitura no celular.
        `;

        const response = await ai.models.generateContent({
            model,
            contents: [
                { role: 'user', parts: [{ text: `Histórico da conversa: ${history.join('\n')}\n\nPergunta do Hóspede: ${message}` }] }
            ],
            config: {
                systemInstruction
            }
        });

        return response.text || "O sinal na serra está um pouco fraco. Poderia repetir?";
    } catch (error) {
        console.error("Chat error", error);
        return "Estou reconectando com a recepção...";
    }
}