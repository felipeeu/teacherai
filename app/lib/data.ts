import { LevelGroup } from "@/types/levels";

interface level {
  value: string;
  completed: string;
}

export const adaptedExams: any = {
  tipo2: {
    instructions: `OBRIGATORIAMENTE Subdivisão em itens caso a pergunta exija mais de um comando, mas com, no máximo, dois ítens.
      Textos mais curtos ou desmembrados.
      Colocar, antes das perguntas relacionadas ao texto, o trecho correspondente que dê suporte a resposta.
      Não constar perguntas de duplo sentido ou com base metafórica.
      Colocar comandos curtos e diretos.
      Dividir o enunciado em partes, definindo a parte I com os dados principais da questão
      e a parte 2 com o(s) comando(s). Lembre-se que a Parte I precisa seguir os parâmetros: 
      Textos mais curtos ou desmembrados, colocar, antes das perguntas relacionadas ao texto, 
      o trecho correspondente que dê suporte a resposta.
      Lembre-se que na Parte II, precisa seguir os parâmetros: Subdivisão em itens se 
      a pergunta tiver mais de um verbo de comando, mas com, no máximo, dois ítens; 
      Não constar perguntas de duplo sentido ou com base metafórica; Colocar comandos curtos 
      e diretos.
      Caso a O PROFESSOR E A questão seja de matemática, É obrigatório, QUE OS VALORES DA QUESTÃO ORIGINAL VENHAM DIFERENTES, CONTANTO QUE TENHA RESULTADO PLAUSÍVEL.
      Caso a questão seja múltipla escolha:
      precisa conter 4 opções, sendo que apenas uma delas está correta.
      As opções consideradas distratores precisam vir com dados incorretos.
      Os distratores não podem vir com as opções "Todas as alternativas acima" e "nenhuma das alternativas acima"
      As questões precisam ter o gabarito comentado.
      As questões precisam ter um texto base, com contexto para ser analisado pelo comando.
      Questões precisam ter conceitos precisos, sem erros.
      Comando da questão não deve NUNCA pedir para selecionar a alternativa incorreta.
      As questões podem ser perguntas ou podem ser parte de texto para continuação da resposta nas opções.
      Caso a questão necessite de uma imagem, gráfico ou tabela, indique que tipo de imagem, gráfico ou tabela poderia ser colocado.
      Comando da questão não pode vir com NEGATIVAS, por exemplo, "marque a alternativa que NÃO…
      Comando NÃO pode vir com o termo "com base em seu conhecimento"ou "com base no que você aprendeu" e nem "com base no que foi visto".`,
  },
  tipo3: {
    instructions: `Simplificação da linguagem: Utilize frases curtas, vocabulário familiar e evite termos técnicos ou abstratos. Use linguagem clara e objetiva, evitando ambiguidades.
      Redução da quantidade de informações: Apresente as informações de forma concisa, focando nos pontos essenciais. Divida o texto em parágrafos menores e use recursos visuais como imagens, gráficos ou tabelas para facilitar a compreensão.
      Uso de exemplos concretos: Utilize exemplos do cotidiano do aluno para ilustrar conceitos abstratos e facilitar a aplicação do conhecimento.
      Dê preferência por questões objetivas: Opte por questões de múltipla escolha ou verdadeiro/falso, que exigem menos leitura e escrita do que questões dissertativas, mas se necessário, permaneça com as questões discursivas.
      Uso de pistas visuais: Utilize recursos como cores, negrito ou sublinhado para destacar informações importantes e auxiliar na organização do pensamento.
      Evite figuras de linguagem.`,
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

export const levels: level[] = [
  { value: "6year", completed: "6° ano do Ensino Fundamental" },
  { value: "7year", completed: "7° ano do Ensino Fundamental" },
  { value: "8year", completed: "8° ano do Ensino Fundamental" },
  { value: "9year", completed: "9° ano do Ensino Fundamental" },
  { value: "1level", completed: "1ᵃ série do Ensino Médio" },
  { value: "2level", completed: "2ᵃ série do Ensino Médio" },
  { value: "3level", completed: "3ᵃ série do Ensino Médio" },
];

export const extendedLevels: level[] = [
  ...levels,
  { value: "5year", completed: "5° ano do Ensino Fundamental" },
  { value: "4year", completed: "4° ano do Ensino Fundamental" },
  { value: "3year", completed: "3° ano do Ensino Fundamental" },
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

export const extendedLevelsMap: any = {
  ...levelMap,
  "5year": "5° ano do Ensino Fundamental",
  "4year": "4° ano do Ensino Fundamental",
  "3year": "3° ano do Ensino Fundamental",
};

export const categoryMap: any = {
  multiple: "Múltipla Escolha",
  discursive: "Discursiva",
};

export enum Category {
  MULTIPLE_CHOICE = "Múltipla Escolha",
  DISCURSIVE = "Discursiva",
  FILL_GAPS = "Completar Lacunas",
}

export enum ExtendedLevels {
  FUNDAMENTAL_THIRD_GRADE = "3° ano do Ensino Fundamental",
  FUNDAMENTAL_FOURTH_GRADE = "4° ano do Ensino Fundamental",
  FUNDAMENTAL_FIFTH_GRADE = "5° ano do Ensino Fundamental",
}

export enum Levels {
  FUNDAMENTAL_SIXTH_GRADE = "6° ano do Ensino Fundamental",
  FUNDAMENTAL_SEVENTH_GRADE = "7° ano do Ensino Fundamental",
  FUNDAMENTAL_EIGHTH_GRADE = "8° ano do Ensino Fundamental",
  FUNDAMENTAL_NINTH_GRADE = "9° ano do Ensino Fundamental",
  HIGH_SCHOOL_FIRST_GRADE = "1ᵃ série do Ensino Médio",
  HIGH_SCHOOL_SECOND_GRADE = "2ᵃ série do Ensino Médio",
  HIGH_SCHOOL_THIRD_GRADE = "3ᵃ série do Ensino Médio",
}

export enum BnccSkills {
  FUNDAMENTAL_NATURAL_SCIENCE = "Competências Específicas de Ciências da Natureza para o Ensino Fundamental Anos Finais",
  FUNDAMENTAL_HUMAN_SCIENCE = "Competências Específicas de Ciências Humanas para o Ensino Fundamental Anos Finais",
  FUNDAMENTAL_MATH_SCIENCE = "Competências Específicas de Matemática para o Ensino Fundamental Anos Finais",
  FUNDAMENTAL_LANGUAGE_SCIENCE = "Competências Específicas de Linguagens para o Ensino Fundamental Anos Finais",
  HIGH_SCHOOL_NATURAL_SCIENCE = "Competências Específicas de Ciências da Natureza e suas Tecnologias para o Ensino Médio",
  HIGH_SCHOOL_HUMAN_SCIENCE = "Competências Específicas de Ciências Humanas e Sociais Aplicadas para o Ensino Médio",
  HIGH_SCHOOL_MATH_SCIENCE = "Competências Específicas de Matemática e suas Tecnologias para o Ensino Médio",
  HIGH_SCHOOL_LANGUAGE_SCIENCE = "Competências Específicas de Linguagens e suas Tecnologias para o Ensino Médio",
}

export enum Fields {
  NATURAL_SCIENCE = "Ciências da Natureza",
  HUMAN_SCIENCE = "Ciências Humanas",
  MATH_SCIENCE = "Matemática",
  LANGUAGE_SCIENCE = "Linguagens",
}

export enum Period {
  FIRST_QUARTER = "1°  trimestre",
  SECOND_QUARTER = "2°  trimestre",
  THIRD_QUARTER = "3°  trimestre",
}

export const levelGroups: LevelGroup[] = [
  {
    name: "Ensino Fundamental",
    id: "comp_fundamental",
    levels: [
      { id: 3, name: "3º ano E.F" },
      { id: 4, name: "4º ano E.F" },
      { id: 5, name: "5º ano E.F" },
      { id: 6, name: "6º ano E.F" },
      { id: 7, name: "7º ano E.F" },
      { id: 8, name: "8º ano E.F" },
      { id: 9, name: "9º ano E.F" },
    ],
  },
  {
    name: "Ensino Médio",
    id: "comp_medio",
    levels: [
      { id: 1, name: "1ᵃ série E.M" },
      { id: 2, name: "2ᵃ série E.M" },
      { id: 3, name: "3ᵃ série E.M" },
    ],
  },
];
