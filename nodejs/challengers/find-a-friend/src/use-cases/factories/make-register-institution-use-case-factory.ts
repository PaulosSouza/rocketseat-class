import { PrismaInstitutionsRepository } from "@/repositories/prisma/prisma-institutions-repository";
import { RegisterInstitutionUseCase } from "../register-institution";

export default function makeRegisterInstitutionUseCaseFactory() {
	const prismaInstitutionRepository = new PrismaInstitutionsRepository();
	const registerInstitutionUseCase = new RegisterInstitutionUseCase(
		prismaInstitutionRepository,
	);

	return registerInstitutionUseCase;
}
