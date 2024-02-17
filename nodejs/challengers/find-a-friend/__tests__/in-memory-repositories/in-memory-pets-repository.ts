import { randomUUID } from "crypto";
import { Pet } from "@/models/pet";
import { CreatePetDTO } from "@/repositories/dtos/create-pet-dto";
import { SearchManyDTO } from "@/repositories/dtos/search-many-dto";
import { PetsRepository } from "@/repositories/pets-repository";
import isAnyObjectValueTruthy from "@/utils/is-any-object-value-truthy";
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
		const { city, state, ...filters } = params;

		const institutionsByCityAndState = this.institutionRepository.items.filter(
			(institution) => institution.city === city && institution.state === state,
		);

		if (!institutionsByCityAndState.length) {
			return [];
		}

		const institutionsIds = institutionsByCityAndState.map(
			(institution) => institution.id,
		);

		const haveAnyFilterValueValid = isAnyObjectValueTruthy(filters);

		if (!haveAnyFilterValueValid) {
			const petsFilteredByCityAndState = this.items.filter((pet) =>
				institutionsIds.includes(pet.institution_id),
			);

			return petsFilteredByCityAndState;
		}

		const pets: Pet[] = [];

		for (const pet of this.items) {
			const petEntriesObject = Object.entries(pet);

			for (const [petKeyObject, petValueObject] of petEntriesObject) {
				const filterValue = filters[petKeyObject as keyof typeof filters];

				if (!filterValue || petValueObject !== filterValue) {
					continue;
				}

				pets.push(pet);
			}
		}

		return pets;
	}

	async findById(id: string): Promise<Pet | null> {
		const pet = this.items.find((pet) => pet.id === id);

		return pet ?? null;
	}
}
