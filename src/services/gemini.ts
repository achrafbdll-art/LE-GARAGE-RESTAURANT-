import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_PROMPT = `Tu es l'assistant IA du restaurant "Le Grand Prix" à Casablanca, situé dans le prestigieux Musée de l'Automobile Club du Maroc.
Ton rôle est d'aider les clients à :
1. Découvrir le menu gastronomique (Cuisine raffinée, produits locaux et internationaux).
2. Comprendre le concept unique : un restaurant niché au milieu d'une collection de voitures classiques.
3. Aider à la réservation (Donne des conseils sur les horaires, tailles de groupe, etc.).
4. Répondre aux questions sur les événements privés.

Ton ton doit être sophistiqué, courtois, et refléter l'exclusivité du lieu. 
Le restaurant est ouvert de 12h à 15h pour le déjeuner et de 19h30 à 23h pour le dîner. Fermé le lundi.

Réponds toujours en français, sauf si le client s'adresse à toi en anglais.`;

export async function askAssistant(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const chat = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    const response = await chat;
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Je suis désolé, je rencontre une petite difficulté technique. Pourriez-vous reformuler votre demande ou nous contacter directement ?";
  }
}
