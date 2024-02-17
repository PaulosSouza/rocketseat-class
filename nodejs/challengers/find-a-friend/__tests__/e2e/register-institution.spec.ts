import { app } from "@/app";
import { faker } from "@faker-js/faker/locale/pt_BR";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register (e2e)", async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to register an institution", async () => {
		const response = await request(app.server)
			.post("/institutions")
			.send({
				owner_name: faker.person.fullName(),
				password: faker.internet.password({ length: 8 }),
				email: faker.internet.email(),
				city: faker.location.city(),
				address: faker.location.street(),
				address_number: faker.location.buildingNumber(),
				neighborhood: faker.location.streetAddress(),
				state: "MG",
				zip_code: faker.location.zipCode().replace("-", ""),
				phone_number: faker.phone.number().replace(/\W+/gi, ""),
			});

		expect(response.statusCode).toEqual(201);
	});
});
