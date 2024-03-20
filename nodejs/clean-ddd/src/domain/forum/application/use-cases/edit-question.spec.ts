import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-id"),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: "question-id",
      authorId: "author-1",
      title: "Question example",
      content: "Content Example",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "Question example",
      content: "Content Example",
    });
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-id"),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    expect(() =>
      sut.execute({
        questionId: "question-id",
        authorId: "author-2",
        title: "Question example",
        content: "Content Example",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
