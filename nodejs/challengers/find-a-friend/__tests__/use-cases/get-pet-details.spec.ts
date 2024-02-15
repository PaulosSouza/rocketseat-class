import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { GetPetUseCase } from "@/use-cases/get-pet-details";
import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";
import { InstitutionsRepositoryInMemory } from "../in-memory-repositories/in-memory-institutions-repository";
import { PetsRepositoryInMemory } from "../in-memory-repositories/in-memory-pets-repository";

let institutionsRepository: InstitutionsRepositoryInMemory;
let petsRepository: PetsRepositoryInMemory;
let sut: GetPetUseCase;

describe("Get Pet Detail Use Case", () => {
	beforeEach(() => {
		institutionsRepository = new InstitutionsRepositoryInMemory();
		petsRepository = new PetsRepositoryInMemory();
		sut = new GetPetUseCase(petsRepository);
	});

	it("should be able to get pet's details", async () => {
		const institution = await institutionsRepository.create({
			ownerName: faker.person.fullName(),
			email: faker.internet.email(),
			address: faker.location.street(),
			addressNumber: faker.location.buildingNumber(),
			city: faker.location.city(),
			neighborhood: faker.location.streetAddress(),
			phoneNumber: faker.phone.number(),
			state: faker.location.state(),
			zipCode: faker.location.zipCode(),
			passwordHash: faker.internet.password(),
		});

		const createdPet = await petsRepository.create({
			name: faker.animal.dog(),
			about: "A beautiful dog",
			autonomy: faker.helpers.enumValue(LEVELS),
			energy: faker.helpers.enumValue(LEVELS),
			size: faker.helpers.enumValue(SIZES),
			environment: faker.helpers.enumValue(SIZES),
			adoption_requirements: faker.helpers.uniqueArray(faker.word.adjective, 4),
			images: faker.helpers.uniqueArray(faker.internet.url, 4),
			institution_id: institution.id,
		});

		const { pet } = await sut.execute({
			petId: createdPet.id,
		});

		expect(pet.id).toEqual(createdPet.id);
	});

	it("should be able to get pet's details", async () => {
		expect(() =>
			sut.execute({
				petId: "fake-pet-id",
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
