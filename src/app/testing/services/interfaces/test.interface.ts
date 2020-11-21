import {QuestionInterface} from './question.interface';

export interface TestInterface {
  id: string;
  test_id: number;
  theme_id: number;
  easy_questions: QuestionInterface[];
  medium_questions: QuestionInterface[];
  difficult_questions: QuestionInterface[];
}
