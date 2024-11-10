import { categoryMap, levelMap } from "../../data";

export const getSecondExamPrompt = (
  subject: string,
  level: string,
  category: string,
  question: string
): string => {
  return `Sou professor de ${subject} de uma escola, para turmas de ${levelMap[level]}, e preciso criar questões para prova de 
          2ª chamada para minha turma, para que eles possam fazer em uma avaliação formal. 
          Estas questões precisam apresentar os conceitos dos objetos de conhecimento abordados, mas alcançando os objetivos estipulados. 
          Para isso, a partir da questão original que será apresentada, você criará uma nova versão dela. 
          Abaixo, seguem os direcionamentos para a criação das questões:
          Questão que esteja adequada para alunos de ${levelMap[level]}.
          A questão criada será chamada de NOVA QUESTÃO
          OBRIGATORIAMENTE A nova questão formulada DEVERÁ SEMPRE vir escrita na mesma língua de origem que a questão original, ou seja, se ela vier em inglês, deverá vir totalmente escrita em inglês.
          SE A QUESTÃO ORIGINAL FOR DE INGLÊS OU ESPANHOL A NOVA QUESTÃO NUNCA DEVERÁ VIR ESCRITA EM PORTUGUÊS.
          Os objetos de conhecimento DEVEM SER PRIORITARIAMENTE E OBRIGATORIAMENTE ABORDADOS.
          Apresentar HABILIDADES PRÓXIMAS DA questão original.
          Apresentar os mesmos conceitos que a questão original.
          A NOVA QUESTÃO PRECISA SER: ${categoryMap[category]}
          A NOVA QUESTÃO OBRIGATORIAMENTE precisa ter o mesmo nível de dificuldade.
          O comando da NOVA QUESTÃO precisa ser diferente da questão original.
          A abordagem da NOVA QUESTÃO DEVE ser diferente da questão original.
          Caso tenham, os distratores não podem vir com as opções "Todas as alternativas acima"e "nenhuma das alternativas acima"
          A NOVA QUESTÃO precisa ter o gabarito comentado.
          A NOVA QUESTÃO precisa ter conceitos precisos, sem erros.
          Comando da NOVA QUESTÃO não deve NUNCA pedir para selecionar a alternativa incorreta.
          A NOVA QUESTÃO podem ser perguntas ou podem ser parte de texto para continuação da resposta nas opções.
          Caso a O PROFESSOR E A questão seja de matemática, É obrigatório, 
          QUE OS VALORES DA QUESTÃO ORIGINAL VENHAM DIFERENTES, CONTANTO QUE TENHA RESULTADO PLAUSÍVEL.
          Comando da NOVA QUESTÃO não pode vir com NEGATIVAS, por exemplo, "marque a alternativa que NÃO…
          Comando não pode vir com o termo "com base em seu conhecimento"ou "com base no que você aprendeu"
          Questão base:
          QUESTÃO 01
          ${question}
          A partir desses dados, crie a questão modificada.`;
};