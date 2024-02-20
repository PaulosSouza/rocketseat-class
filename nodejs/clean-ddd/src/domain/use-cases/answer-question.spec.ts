import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
	const answerQuestionUseCase = new AnswerQuestionUseCase();

	const { answer } = answerQuestionUseCase.execute({
		questionId: "1",
		instructorId: "1",
		content: "New answer",
	});

	expect(answer.content).toEqual("New answer");
});
