import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key not found");
    return new GoogleGenAI({ apiKey });
};

export const explainMath = async (sourceCode: string, question: string) => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `
            You are an expert Game Engine mathematician and C# developer specializing in reverse engineering and game mechanics (specifically Warcraft III engine mechanics).
            
            The user is working on a tool for an abandoned DotA 1 beta.
            
            Here is the C# code being used:
            \`\`\`csharp
            ${sourceCode}
            \`\`\`
            
            User Question: "${question}"
            
            Provide a concise, technical explanation. If specific math concepts (like Atan2) are involved, explain why they are used in 3D space.
            `,
            config: {
                systemInstruction: "Be helpful, concise, and technically accurate for a game cheat/tool developer context."
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Error communicating with AI assistant. Please check your API key.";
    }
};