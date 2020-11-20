export interface QuestionInterface {
  id: string;
  text: string;
  qType: null;
  difficulty: number;
  right_answers: number[];
  points: number;
  subtheme: number;
  answers: {
    [num: string]: string;
  };
}
