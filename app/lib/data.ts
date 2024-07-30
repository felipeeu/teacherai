export const adaptedExams: any = {
  tipo2: {
    instructions: `Subdivisão em itens caso a pergunta exija mais de um comando, mas com, no máximo, dois ítens.
      Textos mais curtos ou desmembrados.
      Colocar, antes das perguntas relacionadas ao texto, o trecho correspondente que dê suporte a resposta.
      Não constar perguntas de duplo sentido ou com base metafórica.
      Colocar comandos curtos e diretos.`,
  },
  tipo3: {
    instructions: `Simplificação da linguagem: Utilize frases curtas, vocabulário familiar e evite termos técnicos ou abstratos. Use linguagem clara e objetiva, evitando ambiguidades.
      Redução da quantidade de informações: Apresente as informações de forma concisa, focando nos pontos essenciais. Divida o texto em parágrafos menores e use recursos visuais como imagens, gráficos ou tabelas para facilitar a compreensão.
      Uso de exemplos concretos: Utilize exemplos do cotidiano do aluno para ilustrar conceitos abstratos e facilitar a aplicação do conhecimento.
      Dê preferência por questões objetivas: Opte por questões de múltipla escolha ou verdadeiro/falso, que exigem menos leitura e escrita do que questões dissertativas, mas se necessário, permaneça com as questões discursivas.
      Uso de pistas visuais: Utilize recursos como cores, negrito ou sublinhado para destacar informações importantes e auxiliar na organização do pensamento.
      Evite figuras de linguagem. `,
  },
};

export const subjects = [
  "Química",
  "Física",
  "Biologia",
  "Matemática",
  "História",
  "Geografia",
  "Ciências",
  "Inglês",
  "Espanhol",
  "Produção Textual",
  "Língua Portuguesa",
  "Educação Física",
  "Artes",
  "Filosofia",
  "Sociologia",
  "Literatura",
];

export const levels: any[] = [
  { value: "6year", completed: "6° ano do Ensino Fundamental" },
  { value: "7year", completed: "7° ano do Ensino Fundamental" },
  { value: "8year", completed: "8° ano do Ensino Fundamental" },
  { value: "9year", completed: "9° ano do Ensino Fundamental" },
  { value: "1level", completed: "1ᵃ série do Ensino Médio" },
  { value: "2level", completed: "2ᵃ série do Ensino Médio" },
  { value: "3level", completed: "3ᵃ série do Ensino Médio" },
];

export const levelMap: any = {
  "6year": "6° ano do Ensino Fundamental",
  "7year": "7° ano do Ensino Fundamental",
  "8year": "8° ano do Ensino Fundamental",
  "9year": "9° ano do Ensino Fundamental",
  "1level": "1ᵃ série do Ensino Médio",
  "2level": "2ᵃ série do Ensino Médio",
  "3level": "3ᵃ série do Ensino Médio",
};

export const categoryMap: any = {
  multiple: "Múltipla Escolha",
  discursive: "Discursiva",
};
