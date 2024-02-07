import { Institution } from "@/models/institution-model";
import { CreateInstitutionDTO } from "./dtos/create-institution-dto";

export interface InstitutionsRepository {
	create(data: CreateInstitutionDTO): Promise<Institution>;
}
