import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import makeGetPetByIdUseCaseFactory from "@/use-cases/factories/make-get-pet-by-id-use-case-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getById(request: FastifyRequest, reply: FastifyReply) {
	const getPetDetailsParamsSchema = z.object({
		petId: z.string().uuid(),
	});

	const { petId } = getPetDetailsParamsSchema.parse(request.params);

	try {
		const useCase = makeGetPetByIdUseCaseFactory();
		const { pet } = await useCase.execute({ petId });

		return reply.code(200).send({ pet });
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: error.message });
		}

		throw error;
	}
}
