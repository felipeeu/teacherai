import { getAdeptedPrompt, getSecondExamPrompt } from "@/app/lib/prompt";
import { geminiApi } from "@/app/utils/geminiApi";
import { GenerateContentResult } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const question = searchParams.get("question") as string;
  const subject = searchParams.get("subject") as string;
  const type = searchParams.get("type") as string;
  const level = searchParams.get("level") as string;
  const category = searchParams.get("category") as string;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const prompt = level
    ? getSecondExamPrompt(subject, level, category, question)
    : getAdeptedPrompt(subject, type, question);

  try {
    const result: GenerateContentResult = await geminiApi(prompt, apiKey);
    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
