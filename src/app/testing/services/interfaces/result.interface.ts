export interface ResultInterface {
  user_id: number;
  theme_id: number;
  test_id: string;
  question: string;
  result?: number;
  user_answers: number[];
}
