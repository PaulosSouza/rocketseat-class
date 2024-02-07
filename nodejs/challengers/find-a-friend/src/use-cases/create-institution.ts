import { Institution } from "@/models/institution-model";
import { InstitutionsRepository } from "@/repositories/institutions-repository";
import { hash } from "bcryptjs";

interface CreateInstitutionUseCaseRequest {
	ownerName: string;
	password: string;
	email: string;
	city: string;
	address: string;
	addressNumber: string;
	neighborhood: string;
	state: string;
	zipCode: string;
	phoneNumber: string;
}

interface CreateInstitutionUseCaseResponse {
	institution: Institution;
}

export class CreateInstitutionUseCase {
	constructor(private institutionsRepository: InstitutionsRepository) {}

	async execute(
		data: CreateInstitutionUseCaseRequest,
	): Promise<CreateInstitutionUseCaseResponse> {
		const passwordHash = await hash(data.password, 6);

		const createInstitutionDTO = {
			...data,
			passwordHash,
		};

		const institution =
			await this.institutionsRepository.create(createInstitutionDTO);

		return {
			institution,
		};
	}
}
