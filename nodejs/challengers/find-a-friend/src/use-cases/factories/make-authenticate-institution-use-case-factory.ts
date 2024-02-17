import { PrismaInstitutionsRepository } from "@/repositories/prisma/prisma-institutions-repository";
import { AuthenticateInstitutionUseCase } from "../authenticate-institution";

export default function makeAuthenticateInstitutionUseCaseFactory(): AuthenticateInstitutionUseCase {
	const prismaInstitutionRepository = new PrismaInstitutionsRepository();
	const authenticateUseCase = new AuthenticateInstitutionUseCase(
		prismaInstitutionRepository,
	);

	return authenticateUseCase;
}
