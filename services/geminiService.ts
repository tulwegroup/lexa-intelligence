
// Always use import {GoogleGenAI} from "@google/genai";
import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY exclusively for initializing the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "Lexa Intelligence Conversational Agent", an advanced AI component of an elegant UK Sponsorship Compliance platform.
Your role is to provide expert guidance on UKVI (UK Visas and Immigration) rules, sponsor licence duties, and organizational compliance status.

Key Guidelines:
1. Tone: Professional, authoritative, yet accessible.
2. Context: You have access to real-time organizational data (passed in via prompts).
3. Capability: You can answer complex regulatory questions, guide users through CoS (Certificate of Sponsorship) processes, and interpret mock audit results.
4. Boundaries: You must always emphasize that your advice is for guidance and that the Authorizing Officer holds final legal responsibility.
5. Knowledge: You are deeply familiar with Appendix Skilled Worker, Appendix Sponsor Duties, and SOC code hierarchies.

When asked about specific workers, use the data provided in the prompt to offer detailed risk assessments.
`;

export const getComplianceAdvice = async (userMessage: string, contextData: any) => {
  try {
    // Always use ai.models.generateContent to query GenAI with both the model name and prompt.
    // Use 'gemini-3-flash-preview' for basic text tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
            CONTEXT: ${JSON.stringify(contextData)}
            USER MESSAGE: ${userMessage}
          `,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    // Directly access the .text property from the GenerateContentResponse object.
    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lexa's intelligence orchestrator is currently recalibrating. Please try again in a moment.";
  }
};
