export const getRelationBnccPrompt = ({
  subject,
  field,
  level,
  skills,
  competencies,
}: {
  subject: string;
  field: string;
  level: string;
  skills: string;
  competencies: string;
}): string => {
  return `ESTOU DESCREVENDO o currículo de uma escola, da área de ${field}, com 
  o Componente Curricular de ${subject}. Crie uma planilha que associe cada competência de
   ${field} para o ${level} da BNCC às habilidades correspondentes. 
   Insira as competências e suas descrições em uma coluna e liste as habilidades 
   que melhor se encaixam em cada uma, com base em suas descrições, em outra 
   coluna ao lado. Estruture a planilha com as seguintes colunas:
    Coluna A: 'Competência' (numeração da competência)
    Coluna B: 'Descrição da Competência' (texto completo da competência)
    Coluna C: 'Habilidade' (numeração da habilidade)
    Coluna D: 'Descrição da Habilidade' (texto completo da habilidade).
    As competências presentes na BNCC são: ${competencies}
    As habilidades presentes na BNCC são: ${skills}
`;
};
