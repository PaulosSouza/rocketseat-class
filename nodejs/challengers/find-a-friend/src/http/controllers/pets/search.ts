import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import makeSearchPetsUseCaseFactory from "@/use-cases/factories/make-search-pets-use-case-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export default async function search(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const searchPetsQueryStringSchema = z.object({
		city: z.string(),
		state: z.string(),
		size: z.nativeEnum(SIZES).optional(),
		environment: z.nativeEnum(SIZES).optional(),
		energy: z.nativeEnum(LEVELS).optional(),
		autonomy: z.nativeEnum(LEVELS).optional(),
	});

	const { city, state, ...filters } = searchPetsQueryStringSchema.parse(
		request.query,
	);

	const useCase = makeSearchPetsUseCaseFactory();
	const { pets } = await useCase.execute({
		city,
		state,
		...filters,
	});

	return reply.status(200).send({ pets });
}
