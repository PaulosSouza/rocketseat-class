import { CreateInstitutionUseCase } from "@/use-cases/create-institution";

import { beforeEach, describe, expect, it } from "vitest";
import { InstitutionsRepositoryInMemory } from "../in-memory-repositories/in-memory-institutions-repository";

let institutionsRepository: InstitutionsRepositoryInMemory;
let sut: CreateInstitutionUseCase;

describe("Create Institution Use Case", () => {
	beforeEach(() => {
		institutionsRepository = new InstitutionsRepositoryInMemory();
		sut = new CreateInstitutionUseCase(institutionsRepository);
	});

	it("should be able to create an institution", async () => {
		const { institution } = await sut.execute({
			ownerName: "John Doe",
			address: "Street of God",
			addressNumber: "230",
			city: "Atlantic City",
			email: "johndoe@exmaple.com",
			neighborhood: "Princeton",
			phoneNumber: "3399999999",
			state: "JW",
			zipCode: "234223423",
			password: "123456",
		});

		expect(institution.id).toEqual(expect.any(String));
	});
});
