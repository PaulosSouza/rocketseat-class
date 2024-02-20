import { Pet } from "@/models/pet";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetPetByIdUseCaseRequest {
	petId: string;
}

interface GetPetByIdUseCaseResponse {
	pet: Pet;
}

export class GetPetByIdUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		petId,
	}: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResponse> {
		const pet = await this.petsRepository.findById(petId);

		if (!pet) {
			throw new ResourceNotFoundError();
		}

		return { pet };
	}
}
