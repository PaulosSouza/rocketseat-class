import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionsCommentRepository {
  create(question: QuestionComment): Promise<void>;
  findById(id: string): Promise<QuestionComment | null>;
  delete(question: QuestionComment): Promise<void>;
}
