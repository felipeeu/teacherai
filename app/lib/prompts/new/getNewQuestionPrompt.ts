import { extendedLevelsMap } from "../../data";

export const getNewQuestionPrompt = (
  subject: string,
  level: string,
  quantity: string,
  category: string,
  skillObject: string,
  baseText: string,
  learnerObject?: string
): string => {
  return `
  Sou professor de ${subject} de uma escola, para turmas de ${
    extendedLevelsMap[level]
  }, e preciso criar ${quantity} questões ${category} para minha turma, para que eles possam fazer em uma avaliação formal. Estas questões precisam apresentar os conceitos dos objetos de conhecimento abordados, mas alcançando os objetivos estipulados.
Abaixo, seguem os direcionamentos para a criação das questões:
Questão que esteja adequada para alunos de ${extendedLevelsMap[level]}
Contexto, com qualidade de informações, retirado do texto base.
O texto base DEVE SER OBRIGATORIAMENTE UTILIZADO.
Os objetos de conhecimento DEVEM SER PRIORITARIAMENTE E OBRIGATORIAMENTE ABORDADOS.
Se for questão objetiva, precisa conter 4 opções, sendo que apenas uma delas está correta.
As opções consideradas distratores precisam vir com dados incorretos.
Os distratores não podem vir com as opções "Todas as alternativas acima" e "nenhuma das alternativas acima"
As questões precisam ter o gabarito comentado.
As questões precisam ter um texto base, com contexto para ser analisado pelo comando.
Questões precisam ter conceitos precisos, sem erros.
Comando da questão não deve NUNCA pedir para selecionar a alternativa incorreta.
As questões podem ser perguntas ou podem ser parte de texto para continuação da resposta nas opções.
Comando da questão não pode vir com NEGATIVAS, por exemplo, "marque a alternativa que NÃO…
Comando NÃO pode vir com o termo "com base em seu conhecimento"ou "com base no que você aprendeu" e nem "com base no que foi visto".
Se a disciplina do professor for INGLÊS ou ESPANHOL, a questão deve vir sempre na língua da disciplina.
Caso o texto base seja um link, é importante retirar um trecho do texto para servir de contexto para a questão.
Se a questão for em Inglês ou Espanhol, o texto base, retirado do link, deverá vir em inglês ou espanhol.
Caso utilize algum texto, cite a fonte do texto.

Objetos de conhecimento: ${skillObject} - OBRIGATORIAMENTE ISTO PRECISA SER ABORDADO.
${learnerObject ? `Objetivos de aprendizagem:  ${learnerObject}` : ""}

Texto base ou link do site que OBRIGATORIAMENTE deve ser utilizado: ${baseText}

A partir desses dados, crie as questões.`;
};
