import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import { Pet } from "@/models/pet";
import { PetsRepository } from "@/repositories/pets-repository";

interface SearchPetsUseCaseRequest {
	city: string;
	state: string;
	size?: SIZES;
	environment?: SIZES;
	energy?: LEVELS;
	autonomy?: LEVELS;
}

interface SearchPetsUseCaseResponse {
	pets: Pet[];
}

export class SearchPetsUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		city,
		state,
		autonomy,
		energy,
		environment,
		size,
	}: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
		const pets = await this.petsRepository.searchMany({
			city,
			state,
			autonomy,
			energy,
			environment,
			size,
		});

		return {
			pets,
		};
	}
}
