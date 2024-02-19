import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import { SearchPetsUseCase } from "@/use-cases/search-pets";
import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";
import { InstitutionsRepositoryInMemory } from "../in-memory-repositories/in-memory-institutions-repository";
import { PetsRepositoryInMemory } from "../in-memory-repositories/in-memory-pets-repository";

let institutionsRepository: InstitutionsRepositoryInMemory;
let petsRepository: PetsRepositoryInMemory;
let sut: SearchPetsUseCase;

describe("Search Pets Use Case", () => {
	beforeEach(() => {
		institutionsRepository = new InstitutionsRepositoryInMemory();
		petsRepository = new PetsRepositoryInMemory(institutionsRepository);
		sut = new SearchPetsUseCase(petsRepository);
	});

	it("should be able to search pets by city and state", async () => {
		const city = faker.location.city();
		const state = faker.location.state();

		const petName = faker.animal.dog();

		const institution = await institutionsRepository.create({
			ownerName: faker.person.fullName(),
			email: faker.internet.email(),
			address: faker.location.street(),
			addressNumber: faker.location.buildingNumber(),
			city,
			state,
			neighborhood: faker.location.streetAddress(),
			phoneNumber: faker.phone.number(),
			zipCode: faker.location.zipCode(),
			passwordHash: faker.internet.password(),
		});

		await petsRepository.create({
			name: petName,
			about: "A beautiful dog",
			autonomy: faker.helpers.enumValue(LEVELS),
			energy: faker.helpers.enumValue(LEVELS),
			size: faker.helpers.enumValue(SIZES),
			environment: faker.helpers.enumValue(SIZES),
			adoptionsRequirements: faker.helpers.uniqueArray(faker.word.adjective, 4),
			images: faker.helpers.uniqueArray(faker.internet.url, 4),
			institutionId: institution.id,
		});

		await petsRepository.create({
			name: petName,
			about: "A beautiful dog",
			autonomy: faker.helpers.enumValue(LEVELS),
			energy: faker.helpers.enumValue(LEVELS),
			size: faker.helpers.enumValue(SIZES),
			environment: faker.helpers.enumValue(SIZES),
			adoptionsRequirements: faker.helpers.uniqueArray(faker.word.adjective, 4),
			images: faker.helpers.uniqueArray(faker.internet.url, 4),
			institutionId: institution.id,
		});

		const { pets } = await sut.execute({
			city,
			state,
		});

		expect(pets).toHaveLength(2);
		expect(pets).toEqual([
			expect.objectContaining({ name: petName }),
			expect.objectContaining({ name: petName }),
		]);
	});

	it("should be able to search pets by its size", async () => {
		const city = faker.location.city();
		const state = faker.location.state();

		const petName = faker.animal.dog();
		const petSize = SIZES.BIG;

		const institution = await institutionsRepository.create({
			ownerName: faker.person.fullName(),
			email: faker.internet.email(),
			address: faker.location.street(),
			addressNumber: faker.location.buildingNumber(),
			city,
			state,
			neighborhood: faker.location.streetAddress(),
			phoneNumber: faker.phone.number(),
			zipCode: faker.location.zipCode(),
			passwordHash: faker.internet.password(),
		});

		for (let index = 1; index <= 3; index++) {
			const size = index !== 3 ? petSize : SIZES.SMALL;

			await petsRepository.create({
				name: petName,
				about: "A beautiful dog",
				autonomy: faker.helpers.enumValue(LEVELS),
				energy: faker.helpers.enumValue(LEVELS),
				size,
				environment: faker.helpers.enumValue(SIZES),
				adoptionsRequirements: faker.helpers.uniqueArray(
					faker.word.adjective,
					4,
				),
				images: faker.helpers.uniqueArray(faker.internet.url, 4),
				institutionId: institution.id,
			});
		}

		const { pets } = await sut.execute({
			city,
			state,
			size: petSize,
		});

		expect(pets).toHaveLength(2);
		expect(pets).toEqual([
			expect.objectContaining({ size: petSize }),
			expect.objectContaining({ size: petSize }),
		]);
	});

	it("should be able to search pets by its energy", async () => {
		const city = faker.location.city();
		const state = faker.location.state();

		const petName = faker.animal.dog();
		const petEnergy = LEVELS.HIGH;

		const institution = await institutionsRepository.create({
			ownerName: faker.person.fullName(),
			email: faker.internet.email(),
			address: faker.location.street(),
			addressNumber: faker.location.buildingNumber(),
			city,
			state,
			neighborhood: faker.location.streetAddress(),
			phoneNumber: faker.phone.number(),
			zipCode: faker.location.zipCode(),
			passwordHash: faker.internet.password(),
		});

		for (let index = 1; index <= 3; index++) {
			const energy = index !== 3 ? petEnergy : LEVELS.MODERATE;

			await petsRepository.create({
				name: petName,
				about: "A beautiful dog",
				autonomy: faker.helpers.enumValue(LEVELS),
				energy,
				size: faker.helpers.enumValue(SIZES),
				environment: faker.helpers.enumValue(SIZES),
				adoptionsRequirements: faker.helpers.uniqueArray(
					faker.word.adjective,
					4,
				),
				images: faker.helpers.uniqueArray(faker.internet.url, 4),
				institutionId: institution.id,
			});
		}

		const { pets } = await sut.execute({
			city,
			state,
			energy: petEnergy,
		});

		expect(pets).toHaveLength(2);
		expect(pets).toEqual([
			expect.objectContaining({ energy: petEnergy }),
			expect.objectContaining({ energy: petEnergy }),
		]);
	});
});
