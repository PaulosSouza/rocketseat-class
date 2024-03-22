import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionsCommentRepository {
  create(question: QuestionComment): Promise<void>;
}
