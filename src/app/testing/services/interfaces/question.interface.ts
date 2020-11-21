import {QuestionTypeEnum} from '../enums/question-type.enum';

export interface QuestionInterface {
  _id: string;
  text: string;
  qType: QuestionTypeEnum;
  difficulty: number;
  points: number;
  subtheme: number;
  answers: {
    [num: string]: string;
  };
}
