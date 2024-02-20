import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

interface AnswerQuestionUseCaseResponse {
	answer: Answer;
}

export class AnswerQuestionUseCase {
	constructor(private answerRepository: AnswersRepository) {}

	async execute({
		questionId,
		instructorId,
		content,
	}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const answer = new Answer({
			content,
			authorId: instructorId,
			questionId,
		});

		await this.answerRepository.create(answer);

		return { answer };
	}
}
