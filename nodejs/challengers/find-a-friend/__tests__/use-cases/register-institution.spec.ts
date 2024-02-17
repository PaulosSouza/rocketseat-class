import { InstitutionEmailAlreadyExists } from "@/use-cases/errors/institution-email-already-exists-error";
import { RegisterInstitutionUseCase } from "@/use-cases/register-institution";
import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";
import { InstitutionsRepositoryInMemory } from "../in-memory-repositories/in-memory-institutions-repository";

let institutionsRepository: InstitutionsRepositoryInMemory;
let sut: RegisterInstitutionUseCase;

describe("Create Institution Use Case", () => {
	beforeEach(() => {
		institutionsRepository = new InstitutionsRepositoryInMemory();
		sut = new RegisterInstitutionUseCase(institutionsRepository);
	});

	it("should be able to create an institution", async () => {
		const { institution } = await sut.execute({
			ownerName: faker.person.fullName(),
			email: faker.internet.email(),
			address: faker.location.street(),
			addressNumber: faker.location.buildingNumber(),
			city: faker.location.city(),
			neighborhood: faker.location.streetAddress(),
			phoneNumber: faker.phone.number(),
			state: faker.location.state(),
			zipCode: faker.location.zipCode(),
			password: faker.internet.password(),
		});

		expect(institution.id).toEqual(expect.any(String));
	});

	it("should not be able to create an institution with same e-mail", async () => {
		const sameEmail = "johndoe@email.com";

		await sut.execute({
			ownerName: faker.person.fullName(),
			email: sameEmail,
			address: faker.location.street(),
			addressNumber: faker.location.buildingNumber(),
			city: faker.location.city(),
			neighborhood: faker.location.streetAddress(),
			phoneNumber: faker.phone.number(),
			state: faker.location.state(),
			zipCode: faker.location.zipCode(),
			password: faker.internet.password(),
		});

		await expect(() =>
			sut.execute({
				ownerName: faker.person.fullName(),
				email: sameEmail,
				address: faker.location.street(),
				addressNumber: faker.location.buildingNumber(),
				city: faker.location.city(),
				neighborhood: faker.location.streetAddress(),
				phoneNumber: faker.phone.number(),
				state: faker.location.state(),
				zipCode: faker.location.zipCode(),
				password: faker.internet.password(),
			}),
		).rejects.toBeInstanceOf(InstitutionEmailAlreadyExists);
	});
});
