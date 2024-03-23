import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswersCommentRepository {
  create(answer: AnswerComment): Promise<void>;
}
