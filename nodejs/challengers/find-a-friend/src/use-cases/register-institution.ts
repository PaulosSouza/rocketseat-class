import { Institution } from "@/models/institution";
import { InstitutionsRepository } from "@/repositories/institutions-repository";
import { hash } from "bcryptjs";
import { InstitutionEmailAlreadyExists } from "./errors/institution-email-already-exists-error";

export interface RegisterInstitutionUseCaseRequest {
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

interface RegisterInstitutionUseCaseResponse {
	institution: Institution;
}

export class RegisterInstitutionUseCase {
	constructor(private institutionsRepository: InstitutionsRepository) {}

	async execute(
		data: RegisterInstitutionUseCaseRequest,
	): Promise<RegisterInstitutionUseCaseResponse> {
		const institutionAlreadyExists =
			await this.institutionsRepository.findByEmail(data.email);

		if (institutionAlreadyExists) {
			throw new InstitutionEmailAlreadyExists();
		}

		const passwordHash = await hash(data.password, 6);

		const createInstitutionDTO = {
			...data,
			password: undefined,
			passwordHash,
		};

		const institution =
			await this.institutionsRepository.create(createInstitutionDTO);

		return {
			institution,
		};
	}
}
