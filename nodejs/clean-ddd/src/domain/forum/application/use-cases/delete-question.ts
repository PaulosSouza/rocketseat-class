import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "@/core/errors/use-cases/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/use-cases/not-allowed-error";

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

type DeleteQuestionUseCaseErrors = ResourceNotFoundError | NotAllowedError;

type DeleteQuestionUseCaseResponse = Either<DeleteQuestionUseCaseErrors, {}>;

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.questionsRepository.delete(question);

    return right({});
  }
}
