import { IUserAnswer } from '../models/user-answer';

export interface IVariant {
  id: number;
  questionId: number;
  variantText: string;
  userAnswers: IUserAnswer[];
}
