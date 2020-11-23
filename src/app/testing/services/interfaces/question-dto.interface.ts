import {QuestionTypeEnum} from '../enums/question-type.enum';

export interface QuestionDtoInterface {
  text: string;
  qType: QuestionTypeEnum;
  difficulty: number;
  points: number;
  subtheme: number;
  answers: {
    [num: string]: string;
  };
}
