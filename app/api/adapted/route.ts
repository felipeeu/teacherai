import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { headers } = request;
  const question = headers.get("question");
  const subject = searchParams.get("subject");
  const type: string = searchParams.get("type") || "";
  const apiKey = "AIzaSyA6PT4jLBKBCrzgJ5OcmYRzo4ragWcPlXs"; // process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }
  const adaptedDetails: any = {
    type2: `Subdivisão em itens caso a pergunta exija mais de um comando, mas com, no máximo, dois ítens.
            Textos mais curtos ou desmembrados.
            Colocar, antes das perguntas relacionadas ao texto, o trecho correspondente que dê suporte a resposta.
            Não constar perguntas de duplo sentido ou com base metafórica. 
            Colocar comandos curtos e diretos.`,
    type3: `Simplificação da linguagem: Utilize frases curtas, vocabulário familiar e evite termos técnicos ou abstratos. Use linguagem clara e objetiva, evitando ambiguidades.
            Redução da quantidade de informações: Apresente as informações de forma concisa, focando nos pontos essenciais. Divida o texto em parágrafos menores e use recursos visuais como imagens, gráficos ou tabelas para facilitar a compreensão.
            Uso de exemplos concretos: Utilize exemplos do cotidiano do aluno para ilustrar conceitos abstratos e facilitar a aplicação do conhecimento.
            Dê preferência por questões objetivas: Opte por questões de múltipla escolha ou verdadeiro/falso, que exigem menos leitura e escrita do que questões dissertativas, mas se necessário, permaneça com as questões discursivas.
            Uso de pistas visuais: Utilize recursos como cores, negrito ou sublinhado para destacar informações importantes e auxiliar na organização do pensamento. 
            Evite figuras de linguagem.
`,
  };
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
      // Safety settings can be added here
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [{ text: "" }],
        },
        {
          role: "model",
          parts: [{ text: "" }],
        },
      ],
    });

    const result = await chatSession.sendMessage(
      `Sou professor de ${subject} de uma escola que apresenta um número considerável de alunos de inclusão. 
      Estes alunos podem ser categorizados em alguns tipos. 
      Para cada tipo é necessário a adaptação das questões de provas, para que elas estejam de acordo com o nível de habilidades destes estudantes.
      Gostaria que você adaptasse a questão que colocarei aqui abaixo para os alunos que estão classificados como tipo ${type}.
      Questões do tipo ${type} apresentam as seguintes necessidades de adaptação:
      ${adaptedDetails[type]}
      A questão é: ${question}
      `
    );
    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
