export type ObjectType =
  | 'date'
  | 'orange'
  | 'apple'
  | 'football'
  | 'car'
  | 'block'
  | 'pencil'
  | 'book';

export interface SceneMeta {
  id: number;
  title: string;
  subtitle: string;
  totalStages: number;
  teacherPrompt: string;
}

export type SceneId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
