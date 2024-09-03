import {
  GenerateContentResult,
  GoogleGenerativeAI,
} from "@google/generative-ai";

export const geminiApi = (
  promptResult: string,
  apiKey: string
): Promise<GenerateContentResult> => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const prompt: string = promptResult;
  const chatSession = model.startChat({
    generationConfig,
  });

  const result = chatSession.sendMessage(prompt);

  return result;
};
