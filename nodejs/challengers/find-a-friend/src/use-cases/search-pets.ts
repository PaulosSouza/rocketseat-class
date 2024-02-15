import { Pet } from "@/models/pet";
import { PetsRepository } from "@/repositories/pets-repository";

interface SearchPetsUseCaseRequest {
	city: string;
	state: string;
}

interface SearchPetsUseCaseResponse {
	pets: Pet[];
}

export class SearchPetsUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		city,
		state,
	}: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
		const pets = await this.petsRepository.searchMany({
			city,
			state,
		});

		return {
			pets,
		};
	}
}
