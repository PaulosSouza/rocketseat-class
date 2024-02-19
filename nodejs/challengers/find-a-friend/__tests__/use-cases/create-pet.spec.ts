import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import { CreatePetUseCase } from "@/use-cases/create-pet";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";
import { InstitutionsRepositoryInMemory } from "../in-memory-repositories/in-memory-institutions-repository";
import { PetsRepositoryInMemory } from "../in-memory-repositories/in-memory-pets-repository";

let institutionsRepository: InstitutionsRepositoryInMemory;
let petsRepository: PetsRepositoryInMemory;
let sut: CreatePetUseCase;

describe("Create Institution Use Case", () => {
	beforeEach(() => {
		institutionsRepository = new InstitutionsRepositoryInMemory();
		petsRepository = new PetsRepositoryInMemory(institutionsRepository);
		sut = new CreatePetUseCase(petsRepository, institutionsRepository);
	});

	it("should be able to register a pet by institution", async () => {
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

		const { pet } = await sut.execute({
			name: faker.animal.dog(),
			about: "A beautiful dog",
			autonomy: faker.helpers.enumValue(LEVELS),
			energy: faker.helpers.enumValue(LEVELS),
			size: faker.helpers.enumValue(SIZES),
			environment: faker.helpers.enumValue(SIZES),
			adoptionsRequirements: faker.helpers.uniqueArray(faker.word.adjective, 4),
			images: faker.helpers.uniqueArray(faker.internet.url, 4),
			institutionId: institution.id,
		});

		expect(pet.id).toEqual(expect.any(String));
	});

	it("should not be able to register a pet by an invalid institution", async () => {
		expect(() =>
			sut.execute({
				name: faker.animal.dog(),
				about: "A beautiful dog",
				autonomy: faker.helpers.enumValue(LEVELS),
				energy: faker.helpers.enumValue(LEVELS),
				size: faker.helpers.enumValue(SIZES),
				environment: faker.helpers.enumValue(SIZES),
				adoptionsRequirements: faker.helpers.uniqueArray(
					faker.word.adjective,
					4,
				),
				images: faker.helpers.uniqueArray(faker.internet.url, 4),
				institutionId: "invalid-institution",
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
