import { Pet } from "@/models/pet";
import { CreatePetDTO } from "./dtos/create-pet-dto";

export interface PetsRepository {
	create(data: CreatePetDTO): Promise<Pet>;

	findById(id: string): Promise<Pet | null>;
}
