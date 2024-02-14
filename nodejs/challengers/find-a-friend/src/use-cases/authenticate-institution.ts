import { Institution } from "@/models/institution-model";
import { InstitutionsRepository } from "@/repositories/institutions-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateInstitutionUseCaseRequest {
	password: string;
	email: string;
}

interface AuthenticateInstitutionUseCaseResponse {
	institution: Institution;
}

export class AuthenticateInstitutionUseCase {
	constructor(private institutionsRepository: InstitutionsRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateInstitutionUseCaseRequest): Promise<AuthenticateInstitutionUseCaseResponse> {
		const institution = await this.institutionsRepository.findByEmail(email);

		if (!institution) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatches = await compare(
			password,
			institution.passwordHash,
		);

		console.log(institution.passwordHash, password);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError();
		}

		return { institution };
	}
}
