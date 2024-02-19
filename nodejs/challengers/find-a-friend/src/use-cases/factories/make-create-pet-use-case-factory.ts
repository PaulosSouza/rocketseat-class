import { PrismaInstitutionsRepository } from "@/repositories/prisma/prisma-institutions-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "../create-pet";

export default function makeCreatePetUseCaseFactory(): CreatePetUseCase {
	const prismaInstitutionRepository = new PrismaInstitutionsRepository();
	const prismaPetsRepository = new PrismaPetsRepository();
	const createPetUseCase = new CreatePetUseCase(
		prismaPetsRepository,
		prismaInstitutionRepository,
	);

	return createPetUseCase;
}
