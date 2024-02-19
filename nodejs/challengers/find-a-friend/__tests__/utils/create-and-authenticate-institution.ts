import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateInstitution(app: FastifyInstance) {
	const institution = await prisma.institution.create({
		data: {
			ownerName: faker.person.fullName(),
			email: "johndoe@example.com",
			passwordHash: await hash("123456", 6),
			city: faker.location.city(),
			address: faker.location.street(),
			addressNumber: faker.location.buildingNumber(),
			neighborhood: faker.location.streetAddress(),
			state: faker.location.state({ abbreviated: true }),
			zipCode: faker.location.zipCode().replace("-", ""),
			phoneNumber: faker.phone.number().replace(/\W+/gi, ""),
		},
	});

	const authResponse = await request(app.server).post("/sessions").send({
		email: "johndoe@example.com",
		password: "123456",
	});

	const { token } = authResponse.body;

	return { token, institution };
}
