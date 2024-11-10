export const getValidationPrompt = ({ field, subject, period, level, question, skills }: { field: string, subject: string, period: string, level: string, question: string, skills: string }): string => {
  return `
Sou coordenador da área de ${field} e preciso validar as provas de ${period} em ${subject}.Para validar tais provas, eu preciso do seguinte:

1 - Descrever qual o objeto de conhecimento está sendo abordado por questão.
2 - Descrever qual a dificuldade da questão
3 - Descrever se o texto ou imagem está coerente com o comando da questão, ou se ele é irrelevante para que a questão seja realizada.
4 - Observar se existem erros ortográficos e gramaticais e indique quais são esses erros.
5 - Colocar o gabarito comentado.
6 - Em questões objetivas, indique porque os distratores estão errados.
7 - Indicar se a prova está adequada para alunos do ${level}
8 -  Indique o somatório das questões
9 -  Indique se as questões apresentam um bom desenvolvimento, levando o estudante a desenvolver muitas habilidades.Caso não apresente, sugira o que pode ser feito na questão para melhorá - la.
10 - OBRIGATORIAMENTE Caso ache algum erro que não siga quaisquer desses pontos acima, destaque em letras maiúsculas e negrito, para melhor observação.
11 - Indique, entre uma nota de zero a 10, em que zero é extremamente fácil e 10 extremamente difícil, o nível da prova em geral.
12 - Indique qual deve ser a provável média de notas da turma.
13 - Ao final, faça um resumo sobre sua análise.
14 - Indique a quais habilidades da matriz de habilidades do ENEM, no link https://download.inep.gov.br/download/enem/matriz_referencia.pdf,  cada questão faz parte. Descreva essas habilidades. Não coloque apenas os códigos.
15 - Ainda, indique quais as competências da BNNC para as ${skills} que estão representadas em cada questão.Caso nenhuma dessas consequências esteja contemplada em alguma questão, não precisa indicar para ela.Use o link: http://portal.mec.gov.br/docman/abril-2018-pdf/85121-bncc-ensino-medio/file
16 - INDIQUE SE A PROVA PODE SER VALIDADA PARA IMPRESSÃO OU SE ELA PRECISA DE AJUSTES.

As questões SÃO:  ${question}`
}