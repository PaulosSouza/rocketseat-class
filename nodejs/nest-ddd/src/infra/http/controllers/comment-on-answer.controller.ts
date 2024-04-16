import { CommentOnAnswerUseCase } from "@/domain/forum/application/use-cases/comment-on-answer";
import { CurrentUser } from "@/infra/auth/current-user.decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { BadRequestException, Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation.pipe";

const commentOnAnswerBodySchema = z.object({
  content: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(commentOnAnswerBodySchema);

type CommentOnAnswerBodySchema = z.infer<typeof commentOnAnswerBodySchema>;

@Controller("/answers/:answerId/comments")
export class CommentOnAnswerController {
  constructor(private readonly commentOnAnswer: CommentOnAnswerUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CommentOnAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param("answerId") answerId: string,
  ) {
    const { sub: userId } = user;
    const { content } = body;

    const result = await this.commentOnAnswer.execute({
      content,
      answerId,
      authorId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
