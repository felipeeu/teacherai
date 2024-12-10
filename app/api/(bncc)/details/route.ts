import { getSkillDetailsPrompt } from "@/app/lib/prompts/bncc";
import { geminiApi } from "@/app/utils/geminiApi";
import { GenerateContentResult } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams }: { searchParams: URLSearchParams } = new URL(
    request.url
  );
  const subject = searchParams.get("subject") as string;
  const level = searchParams.get("level") as string;
  const field = searchParams.get("field") as string;
  const skills = searchParams.get("skills") as string;
  const link = (searchParams.get("link") as string) || "";
  const details = searchParams.get("details") as string;

  const apiKey = process.env.GEMINI_API_KEY as string;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const prompt: string = getSkillDetailsPrompt({
    field,
    subject,
    level,
    skills,
    link,
    details,
  });

  try {
    const result: GenerateContentResult = await geminiApi(prompt, apiKey);
    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
