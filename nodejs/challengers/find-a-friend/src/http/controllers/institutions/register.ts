import { InstitutionEmailAlreadyExists } from "@/use-cases/errors/institution-email-already-exists-error";
import makeRegisterInstitutionUseCaseFactory from "@/use-cases/factories/make-register-institution-use-case-factory";
import { RegisterInstitutionUseCaseRequest } from "@/use-cases/register-institution";
import * as changeKeys from "change-case/keys";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerInstitutionBodySchema = z.object({
		owner_name: z.string(),
		password: z.string().min(6),
		email: z.string().email(),
		city: z.string(),
		address: z.string(),
		address_number: z.string(),
		neighborhood: z.string(),
		state: z.string().max(2),
		zip_code: z.string().max(12),
		phone_number: z.string().max(11),
	});

	const registerInstitutionDataValidated = registerInstitutionBodySchema.parse(
		request.body,
	);

	try {
		const registerInsitutionDataParsed = changeKeys.camelCase(
			registerInstitutionDataValidated,
		) as RegisterInstitutionUseCaseRequest;

		const useCase = makeRegisterInstitutionUseCaseFactory();
		await useCase.execute(registerInsitutionDataParsed);

		return reply.code(200).send();
	} catch (error) {
		if (error instanceof InstitutionEmailAlreadyExists) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}
}
