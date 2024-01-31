import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Nearby Gyms (e2e)", async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to list nearby gyms", async () => {
		const { token } = await createAndAuthenticateUser(app);

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "Javascript Gym",
				description: "Some description.",
				phone: "119999999",
				latitude: -18.8484347,
				longitude: -41.9494066,
			});

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "Typescript Gym",
				description: "Some description.",
				phone: "119999999",
				latitude: -18.1866088,
				longitude: -40.7191121,
			});

		const response = await request(app.server)
			.get("/gyms/nearby")
			.query({
				latitude: -18.8484347,
				longitude: -41.9494066,
			})
			.set("Authorization", `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: "Javascript Gym",
			}),
		]);
	});
});
