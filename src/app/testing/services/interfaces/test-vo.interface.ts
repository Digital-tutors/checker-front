import {TestDtoInterface} from './test-dto.interface';
import {QuestionVoInterface} from './question-vo.interface';

type TestWithoutQuestions = Omit<Omit<Omit<TestDtoInterface, 'easy_questions'>, 'medium_questions'>, 'difficult_questions'>;

export interface TestVoInterface extends TestWithoutQuestions {
  _id: string;
  easy_questions: QuestionVoInterface[];
  medium_questions: QuestionVoInterface[];
  difficult_questions: QuestionVoInterface[];
}
