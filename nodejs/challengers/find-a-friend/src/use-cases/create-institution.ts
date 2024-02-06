import { InstitutionsRepository } from "@/repositories/institutions-repository";

type CreateInstitutionUseCaseRequest = undefined;

type CreateInstitutionUseCaseResponse = undefined;

export class CreateInstitutionUseCase {
	constructor(private gymsRepository: InstitutionsRepository) {}

	async execute(): Promise<CreateInstitutionUseCaseResponse> {}
}
