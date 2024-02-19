import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import { CreatePetUseCaseRequest } from "@/use-cases/create-pet";
import { InstitutionEmailAlreadyExists } from "@/use-cases/errors/institution-email-already-exists-error";
import makeCreatePetUseCaseFactory from "@/use-cases/factories/make-create-pet-use-case-factory";
import * as changeKeys from "change-case/keys";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createPetBodySchema = z.object({
		name: z.string(),
		about: z.string(),
		size: z.nativeEnum(SIZES),
		environment: z.nativeEnum(SIZES),
		energy: z.nativeEnum(LEVELS),
		autonomy: z.nativeEnum(LEVELS),
		images: z.string().array(),
		adoptions_requirements: z.string().array(),
		institution_id: z.string().uuid(),
	});

	const createPetBodyValidated = createPetBodySchema.parse(request.body);

	try {
		const createPetDataParsed = changeKeys.camelCase(
			createPetBodyValidated,
		) as CreatePetUseCaseRequest;

		const useCase = makeCreatePetUseCaseFactory();
		await useCase.execute(createPetDataParsed);

		return reply.code(201).send();
	} catch (error) {
		if (error instanceof InstitutionEmailAlreadyExists) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}
}
