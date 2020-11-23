import {QuestionTypeEnum} from '../enums/question-type.enum';

export interface QuestionDtoInterface {
  text: string;
  qtype: QuestionTypeEnum;
  difficulty: number;
  points: number;
  subtheme: number;
  right_answers: number[];
  answers: {
    [num: string]: string;
  };
}
