import { adaptedExams, categoryMap, levelMap } from "./data";

export const getAdeptedPrompt = (
  subject: string,
  type: string,
  question: string
) => {
  return `Sou professor de ${subject} de uma escola que apresenta um número considerável de alunos de inclusão. Estes alunos podem ser categorizados em alguns tipos. ,
    Para cada tipo é necessário a adaptação das questões de provas, para que elas estejam de acordo com o nível de habilidades destes estudantes.,
    Gostaria que você adaptasse a questão que colocarei aqui abaixo para os alunos que estão classificados como ${type}.
    Questões do tipo ${type} apresentam as seguintes necessidades de adaptação:
    ${adaptedExams[type].instructions}
    A questão é: ${question}
    `;
};

export const getSecondExamPrompt = (
  subject: string,
  level: string,
  category: string,
  question: string
) => {
  return `Sou professor de ${subject} de uma escola, para turmas de ${levelMap[level]}, e preciso criar questões para prova de 
          2ª chamada para minha turma, para que eles possam fazer em uma avaliação formal. 
          Estas questões precisam apresentar os conceitos dos objetos de conhecimento abordados, mas alcançando os objetivos estipulados. 
          Para isso, a partir da questão original que será apresentada, você criará uma nova versão dela. 
          Abaixo, seguem os direcionamentos para a criação das questões:
          Questão que esteja adequada para alunos de ${levelMap[level]}.
          A questão criada será chamada de NOVA QUESTÃO
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
          Comando da NOVA QUESTÃO não pode vir com NEGATIVAS, por exemplo, "marque a alternativa que NÃO…
          Comando não pode vir com o termo "com base em seu conhecimento"ou "com base no que você aprendeu"
          Questão base:
          QUESTÃO 01
          ${question}
          A partir desses dados, crie a questão modificada.`;
};
