import {QuestionTypeEnum} from '../enums/question-type.enum';

export interface QuestionInterface {
  id: string;
  text: string;
  qType: QuestionTypeEnum;
  difficulty: number;
  right_answers: number[];
  points: number;
  subtheme: number;
  answers: {
    [num: string]: string;
  };
}
