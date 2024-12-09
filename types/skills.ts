export interface Skill {
  nome_codigo: string;
  nome_habilidade: string;
}

export interface YearSkills {
  nome_ano: string[];
  codigo_habilidade: Skill[];
}

export interface Subject {
  nome_disciplina: string;
  ano: YearSkills[];
}

export interface SkillsData {
  [key: string]: Subject;
}

export interface SelectedSkills {
  [key: string]: string[]; // disciplina -> array of skill codes
}
