export interface Level {
  id: number;
  name: string;
}

export interface LevelGroup {
  id: string;
  name: string;
  levels: Level[];
}

export interface SelectedLevels {
  fundamental: number[];
  highSchool: number[];
}
