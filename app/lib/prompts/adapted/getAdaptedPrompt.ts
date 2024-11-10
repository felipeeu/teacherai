import { adaptedExams } from "../../data";

export const getAdaptedPrompt = (
  subject: string,
  type: string,
  question: string
): string => {
  return `Sou professor de ${subject} de uma escola que apresenta um número considerável de alunos de inclusão. Estes alunos podem ser categorizados em alguns tipos. ,
    Para cada tipo é necessário a adaptação das questões de provas, para que elas estejam de acordo com o nível de habilidades destes estudantes.,
    Gostaria que você adaptasse a questão que colocarei aqui abaixo para os alunos que estão classificados como ${type}.
    Questões do tipo ${type} apresentam as seguintes necessidades de adaptação:
    ${adaptedExams[type].instructions}
    A questão é: ${question}
    `;
};