import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Restaurant } from "../types";

// Initialize with API key from environment - will fail gracefully if not set
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

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
    if (!ai) {
      // Fallback data when API key is not available
      return [
        {
          name: "Mont Vert - A Casa do Fondue",
          description: "Referência em fondues premium e rodízios. Ambiente sofisticado com música ao vivo e adega climatizada.",
          cuisine: "Fondue & Suíça",
          priceRange: "$$$$"
        },
        {
          name: "Villa Donna Bistrô",
          description: "Culinária italiana artesanal com toque contemporâneo. Famoso pelos risotos e massas frescas em um chalé aconchegante.",
          cuisine: "Italiana / Bistrô",
          priceRange: "$$$"
        },
        {
          name: "Paulo das Trutas",
          description: "O mais tradicional restaurante de trutas da região. Pratos frescos direto do trutário local. Simples e imperdível.",
          cuisine: "Trutas & Grelhados",
          priceRange: "$$"
        }
      ];
    }

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
    // Return fallback data on error
    return [
      {
        name: "Mont Vert - A Casa do Fondue",
        description: "Referência em fondues premium e rodízios. Ambiente sofisticado com música ao vivo e adega climatizada.",
        cuisine: "Fondue & Suíça",
        priceRange: "$$$$"
      },
      {
        name: "Villa Donna Bistrô",
        description: "Culinária italiana artesanal com toque contemporâneo. Famoso pelos risotos e massas frescas em um chalé aconchegante.",
        cuisine: "Italiana / Bistrô",
        priceRange: "$$$"
      },
      {
        name: "Paulo das Trutas",
        description: "O mais tradicional restaurante de trutas da região. Pratos frescos direto do trutário local. Simples e imperdível.",
        cuisine: "Trutas & Grelhados",
        priceRange: "$$"
      }
    ];
  }
};

export const chatWithConcierge = async (message: string, history: string[]): Promise<string> => {
    try {
        if (!ai) {
          return "Estou reconectando com a recepção...";
        }

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