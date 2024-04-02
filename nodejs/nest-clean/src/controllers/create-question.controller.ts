import { CurrentUser } from "@/auth/current-user-decorator";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { UserPayload } from "@/auth/jwt.strategy";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { PrismaService } from "@/prisma/prisma.service";
import { Body, Controller, HttpCode, Post, UseGuards, UsePipes } from "@nestjs/common";

import { z } from "zod";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { sub: userId } = user;
    const { title, content } = body;

    const slug = this.convertToSlug(title);

    await this.prisma.question.create({
      data: {
        title,
        content,
        slug,
        authorId: userId,
      },
    });
  }

  private convertToSlug(title: string): string {
    return (
      title
        .toLowerCase()
        .normalize("NFD")
        // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
    );
  }
}
