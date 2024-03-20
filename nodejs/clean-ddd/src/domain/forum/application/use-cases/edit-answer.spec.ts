import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-id"),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: "answer-id",
      authorId: "author-1",
      content: "Content Example",
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "Content Example",
    });
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-id"),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    expect(() =>
      sut.execute({
        answerId: "answer-id",
        authorId: "author-2",
        content: "Content Example",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
