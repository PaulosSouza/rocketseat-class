import { QuestionsCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionsCommentRepository {
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }
}
