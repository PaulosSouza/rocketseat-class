import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author";
import { Comment as PrismaComment, User as PrismaUser } from "@prisma/client";

type PrismaComemntWithAuthor = PrismaComment & { author: PrismaUser };

export class PrismaCommentWithAuthorMapper {
  static toDomain(raw: PrismaComemntWithAuthor): CommentWithAuthor {
    if (!raw.questionId) {
      throw new Error("Invalid comment type.");
    }

    return CommentWithAuthor.create({
      content: raw.content,
      authorId: new UniqueEntityID(raw.authorId),
      commentId: new UniqueEntityID(raw.id),
      author: raw.author.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
