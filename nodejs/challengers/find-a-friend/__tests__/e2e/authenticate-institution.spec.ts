import { app } from "@/app";
import { faker } from "@faker-js/faker/locale/pt_BR";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate Institution (e2e)", async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to authenticate an institution", async () => {
		const password = faker.internet.password({ length: 8 });
		const email = faker.internet.email();

		await request(app.server)
			.post("/institutions")
			.send({
				owner_name: faker.person.fullName(),
				password,
				email,
				city: faker.location.city(),
				address: faker.location.street(),
				address_number: faker.location.buildingNumber(),
				neighborhood: faker.location.streetAddress(),
				state: faker.location.state({ abbreviated: true }),
				zip_code: faker.location.zipCode().replace("-", ""),
				phone_number: faker.phone.number().replace(/\W+/gi, ""),
			});

		const response = await request(app.server).post("/sessions").send({
			email,
			password,
		});

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});
});
