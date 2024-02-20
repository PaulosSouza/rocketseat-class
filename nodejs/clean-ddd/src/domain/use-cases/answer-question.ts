import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

interface AnswerQuestionUseCaseResponse {
	answer: Answer;
}

export class AnswerQuestionUseCase {
	execute({
		questionId,
		instructorId,
		content,
	}: AnswerQuestionUseCaseRequest): AnswerQuestionUseCaseResponse {
		const answer = new Answer({
			content,
			authorId: instructorId,
			questionId,
		});

		return { answer };
	}
}
