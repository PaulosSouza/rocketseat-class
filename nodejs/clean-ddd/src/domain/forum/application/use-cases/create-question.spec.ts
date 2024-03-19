import { QuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";
import { CreateQuestionUseCase } from "./create-question";

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question): Promise<void> => {
    return;
  },
};

test("create a question", async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(fakeQuestionsRepository);

  const { question } = await createQuestionUseCase.execute({
    authorId: "1",
    title: "New question",
    content: "Question content",
  });

  expect(question.id).toBeTruthy();
});
