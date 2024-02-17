import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import makeAuthenticateInstitutionUseCaseFactory from "@/use-cases/factories/make-authenticate-institution-use-case-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const authenticateInstitutionBodySchema = z.object({
		password: z.string().min(6),
		email: z.string().email(),
	});

	const { email, password } = authenticateInstitutionBodySchema.parse(
		request.body,
	);

	try {
		const useCase = makeAuthenticateInstitutionUseCaseFactory();
		const { institution } = await useCase.execute({ email, password });

		const token = await reply.jwtSign(
			{},
			{
				sign: { sub: institution.id },
			},
		);

		return reply.code(200).send({ token });
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}
}
