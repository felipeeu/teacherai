import { adaptedExams, categoryMap, levelMap } from "./data";

export const getAdeptedPrompt = (
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
  Sou professor de ${subject} de uma escola, para turmas de ${level}, e preciso criar ${quantity} questões ${category} para minha turma, para que eles possam fazer em uma avaliação formal. Estas questões precisam apresentar os conceitos dos objetos de conhecimento abordados, mas alcançando os objetivos estipulados.
Abaixo, seguem os direcionamentos para a criação das questões:
Questão que esteja adequada para alunos de ${level}
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
