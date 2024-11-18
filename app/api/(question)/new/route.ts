import { getNewQuestionPrompt } from "@/app/lib/prompts";
import { geminiApi } from "@/app/utils/geminiApi";
import { GenerateContentResult } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams }: { searchParams: URLSearchParams } = new URL(
    request.url
  );
  const subject = searchParams.get("subject") as string;
  const level = searchParams.get("level") as string;
  const quantity = searchParams.get("quantity") as string;
  const category = searchParams.get("category") as string;
  const skillObject = searchParams.get("skillObject") as string;
  const baseText = searchParams.get("baseText") as string;
  const learnerObject = searchParams.get("learnerObject") as string;

  const apiKey = process.env.GEMINI_API_KEY as string;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const prompt: string = getNewQuestionPrompt(
    subject,
    level,
    quantity,
    category,
    skillObject,
    baseText,
    learnerObject
  );

  try {
    const result: GenerateContentResult = await geminiApi(prompt, apiKey);
    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
