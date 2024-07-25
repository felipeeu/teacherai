import { getAdeptedPrompt } from "@/app/lib/prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const question = searchParams.get("question") as string;
  const subject = searchParams.get("subject") as string;
  const type = searchParams.get("type") as string;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  try {
    const chatSession = model.startChat({
      generationConfig,
    });
    const prompt = getAdeptedPrompt(subject, type, question);
    const result = await chatSession.sendMessage(prompt);
    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
