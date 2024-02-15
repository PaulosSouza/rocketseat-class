import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import { Pet } from "@/models/pet";
import { InstitutionsRepository } from "@/repositories/institutions-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreatePetUseCaseRequest {
	name: string;
	about: string;
	size: SIZES;
	environment: SIZES;
	energy: LEVELS;
	autonomy: LEVELS;
	images: string[];
	adoption_requirements: string[];
	institution_id: string;
}

interface CreatePetUseCaseResponse {
	pet: Pet;
}

export class CreatePetUseCase {
	constructor(
		private petsRepository: PetsRepository,
		private institutionRepository: InstitutionsRepository,
	) {}

	async execute(
		data: CreatePetUseCaseRequest,
	): Promise<CreatePetUseCaseResponse> {
		const institutionAlredyExists = await this.institutionRepository.findById(
			data.institution_id,
		);

		if (!institutionAlredyExists) {
			throw new ResourceNotFoundError();
		}

		const pet = await this.petsRepository.create(data);

		return {
			pet,
		};
	}
}
