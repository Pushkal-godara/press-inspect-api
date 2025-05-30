import { InjectModel } from "@nestjs/sequelize";
import { Country } from "./entities/country.entity";

export class CountryService {
    constructor(
        @InjectModel(Country)
        private customerModel: typeof Country,
      ) {}
}