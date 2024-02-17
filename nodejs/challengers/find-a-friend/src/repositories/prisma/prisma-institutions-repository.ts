import { prisma } from "@/lib/prisma";
import { Institution } from "@/models/institution";
import { CreateInstitutionDTO } from "../dtos/create-institution-dto";
import { InstitutionsRepository } from "../institutions-repository";

export class PrismaInstitutionsRepository implements InstitutionsRepository {
	async create(data: CreateInstitutionDTO): Promise<Institution> {
		const institution = prisma.institution.create({
			data,
		});

		return institution;
	}

	async findByEmail(email: string): Promise<Institution | null> {
		const institution = prisma.institution.findUnique({
			where: {
				email,
			},
		});

		return institution;
	}

	async findById(id: string): Promise<Institution | null> {
		const institution = prisma.institution.findUnique({
			where: {
				id,
			},
		});

		return institution;
	}
}
