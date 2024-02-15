import { randomUUID } from "crypto";
import { Pet } from "@/models/pet";
import { CreatePetDTO } from "@/repositories/dtos/create-pet-dto";
import { SearchManyDTO } from "@/repositories/dtos/search-many-dto";
import { PetsRepository } from "@/repositories/pets-repository";
import { InstitutionsRepositoryInMemory } from "./in-memory-institutions-repository";

export class PetsRepositoryInMemory implements PetsRepository {
	public items: Pet[] = [];

	constructor(private institutionRepository: InstitutionsRepositoryInMemory) {}

	async create(data: CreatePetDTO): Promise<Pet> {
		const pet = {
			id: randomUUID(),
			...data,
		};

		this.items.push(pet);

		return pet;
	}

	async searchMany(params: SearchManyDTO): Promise<Pet[]> {
		const { city, state } = params;

		const institutionsByCityAndState = this.institutionRepository.items.filter(
			(institution) => institution.city === city && institution.state === state,
		);

		if (!institutionsByCityAndState.length) {
			return [];
		}

		const institutionsIds = institutionsByCityAndState.map(
			(institution) => institution.id,
		);

		const pets = this.items.filter((pet) =>
			institutionsIds.includes(pet.institution_id),
		);

		return pets;
	}

	async findById(id: string): Promise<Pet | null> {
		const pet = this.items.find((pet) => pet.id === id);

		return pet ?? null;
	}
}
