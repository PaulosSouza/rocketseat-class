import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";
import { makeQuestionComment } from "test/factories/make-question-comment";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe("Fetch Recent Question Comments", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to fetch question comments", async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") }),
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") }),
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") }),
    );

    const { questionComments } = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(questionComments).toHaveLength(3);
  });

  it("should be able to fetch paginated question comments", async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID("question-1") }),
      );
    }

    const { questionComments } = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(questionComments).toHaveLength(2);
  });
});
