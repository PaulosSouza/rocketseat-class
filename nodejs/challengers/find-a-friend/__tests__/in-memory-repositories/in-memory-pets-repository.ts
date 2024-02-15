import { randomUUID } from "crypto";
import { Pet } from "@/models/pet";
import { CreatePetDTO } from "@/repositories/dtos/create-pet-dto";
import { PetsRepository } from "@/repositories/pets-repository";

export class PetsRepositoryInMemory implements PetsRepository {
	public items: Pet[] = [];

	async create(data: CreatePetDTO): Promise<Pet> {
		const pet = {
			id: randomUUID(),
			...data,
		};

		this.items.push(pet);

		return pet;
	}
}
