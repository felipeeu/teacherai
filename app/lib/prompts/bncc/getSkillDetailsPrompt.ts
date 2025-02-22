export const getSkillDetailsPrompt = ({
  subject,
  field,
  level,
  skills,
  details,
  link,
}: {
  subject: string;
  field: string;
  level: string;
  skills: string;
  details: string;
  link: string;
}): string => {
  return `
  ESTOU DESCREVENDO o currículo de uma escola, da área de ${field}, com o Componente Curricular de ${subject}. 
  Este documento apresenta competências, habilidades e detalhamento de habilidades (DHs). Eu quero que você leia as 
  habilidades que serão colocadas e descreva os detalhamentos dessas habilidades a partir dos seguintes pontos.
1 - Você deve descrever apenas ${details} detalhamentos dessas habilidades
2 - Seja coerente quanto ao número de DHs que você está descrevendo.
3 - O detalhamento de habilidade são habilidades menos complexas que juntos garantem que a habilidade maior seja desenvolvida.
4 - Os verbos dos detalhamentos de habilidades devem ser menos complexos do que da própria habilidade segundo os verbos da Taxonomia de Bloom. 
**5 - O detalhamento de habilidade deve ser descrito da seguinte forma: Verbo + objeto de conhecimento + base referencial + aplicação.** 
6 - A aplicação deve ser no contexto do estudante. Nesse caso, o estudante em que quero desenvolver a habilidade está no ${level}
**7 - O detalhamento de habilidade deve ser descrito como um parágrafo, texto corrido. Nada em tópicos.**
${link ? `8 - Use como material base o livro no link:${link}` : ``} 
9 - Para cada habilidade, indique:
a - Os objetos de conhecimento abordados para ela, em lista
b - As abordagens metodológicas (As abordagens precisam ser metodologias ativas)
c - Associe e justifique com poucas palavras três desses eixos à cada habilidade. Sendo eles: 
	8.1.1 Eu e os Outros / The Others and I
8.1.2 Nossa Expressividade / Our Expressiveness
8.1.3 Nossa Organização / Our Organization
8.1.4 Compreendendo o Mundo / Understanding the World
8.1.5 Responsabilidade Global / Global Responsibility
8.1.6 Eu, o Tempo e o Espaço / Time, Space and I

A habilidade para serem criados os detalhamentos é: ${skills}

`;
};
