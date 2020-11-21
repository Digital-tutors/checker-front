import {QuestionInterface} from './question.interface';

export interface ThemeTestsInterface {
  _id: string;
  theme_id: number;
  easy_questions: QuestionInterface[];
  medium_questions: QuestionInterface[];
  difficult_questions: QuestionInterface[];
}
