import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetByIdUseCase } from "../get-pet-by-id";

export default function makeGetPetByIdUseCaseFactory(): GetPetByIdUseCase {
	const prismaPetsRepository = new PrismaPetsRepository();
	const getPetDetailsUseCase = new GetPetByIdUseCase(prismaPetsRepository);

	return getPetDetailsUseCase;
}
