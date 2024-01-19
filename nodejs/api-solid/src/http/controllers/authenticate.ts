import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentailsError } from "@/use-cases/errors/invalid-credentials-error";
import { UserEmailAlreadyExistsError } from "@/use-cases/errors/user-email-already-exists-error";

import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = authenticateBodySchema.parse(request.body);

	try {
		const prismaUsersRepository = new PrismaUsersRepository();
		const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

		await authenticateUseCase.execute({
			email,
			password,
		});
	} catch (error) {
		if (error instanceof InvalidCredentailsError) {
			return reply.status(400).send({ message: error.message });
		}

		throw error;
	}

	return reply.status(200).send();
}
