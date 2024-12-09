export interface Competency {
  nome_competencia: string;
  competencias: string[];
}

export interface CompetenciasFundamental {
  comp_portugues: Competency;
  comp_arte: Competency;
  comp_educacao_fisica: Competency;
  comp_ingles: Competency;
  comp_matematica: Competency;
  comp_ciencias_natureza: Competency;
  comp_geografia: Competency;
  comp_historia: Competency;
  comp_ensino_religioso: Competency;
  comp_computacao: Competency;
}

export interface CompetenciasMedio {
  comp_linguagens: Competency;
  comp_matematica: Competency;
  comp_ciencias_natureza: Competency;
  comp_ciencias_humanas: Competency;
  comp_computacao_em: Competency;
}

export interface CompetenciasData {
  comp_gerais: Competency;
  comp_fundamental: CompetenciasFundamental;
  comp_medio: CompetenciasMedio;
}
