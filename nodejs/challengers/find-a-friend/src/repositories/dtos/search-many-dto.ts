import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";

export interface SearchManyDTO {
	city: string;
	state: string;
	size?: SIZES;
	environment?: SIZES;
	energy?: LEVELS;
	autonomy?: LEVELS;
}
