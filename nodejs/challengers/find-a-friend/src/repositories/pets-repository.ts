import { Pet } from "@/models/pet";
import { CreatePetDTO } from "./dtos/create-pet-dto";
import { SearchManyDTO } from "./dtos/search-many-dto";

export interface PetsRepository {
	create(data: CreatePetDTO): Promise<Pet>;

	searchMany(params: SearchManyDTO): Promise<Pet[]>;

	findById(id: string): Promise<Pet | null>;
}
