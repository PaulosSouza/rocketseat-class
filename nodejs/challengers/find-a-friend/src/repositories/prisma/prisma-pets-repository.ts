import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import { prisma } from "@/lib/prisma";
import { Pet } from "@/models/pet";
import { Pet as PrismaPet } from "@prisma/client";
import { CreatePetDTO } from "../dtos/create-pet-dto";
import { SearchManyDTO } from "../dtos/search-many-dto";
import { PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
	async create(data: CreatePetDTO): Promise<Pet> {
		const pet = await prisma.pet.create({
			data,
		});

		return this.transformPrismaEnumsToPetEnumsModel(pet);
	}

	async searchMany(params: SearchManyDTO): Promise<Pet[]> {
		const { city, state, ...filters } = params;

		const findPets = await prisma.pet.findMany({
			where: {
				institution: {
					city,
					state,
				},
				...filters,
			},
		});

		const pets = findPets.map(this.transformPrismaEnumsToPetEnumsModel);

		return pets;
	}

	async findById(id: string): Promise<Pet | null> {
		const pet = await prisma.pet.findUnique({
			where: {
				id,
			},
		});

		if (!pet) {
			return null;
		}

		return this.transformPrismaEnumsToPetEnumsModel(pet);
	}

	private transformPrismaEnumsToPetEnumsModel(pet: PrismaPet): Pet {
		return {
			...pet,
			size: pet.size as SIZES,
			environment: pet.environment as SIZES,
			energy: pet.energy as LEVELS,
			autonomy: pet.autonomy as LEVELS,
		};
	}
}
