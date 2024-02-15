import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";

export class Pet {
	id!: string;
	name!: string;
	about!: string;
	size!: SIZES;
	energy!: LEVELS;
	autonomy!: LEVELS;
	images!: string[];
	adoption_requirements!: string[];
	institution_id!: string;
}
