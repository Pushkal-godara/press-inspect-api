import { InjectModel } from "@nestjs/sequelize";
import { Country } from "./entities/country.entity";
import { CreateCountryDto } from './dto/create-country-dto';

export class CountryService {
    constructor(
        @InjectModel(Country)
        private countryModel: typeof Country,
      ) {}

      async findAll(currentUser?: any): Promise<Country[]> {
        return this.countryModel.findAll();
      }

      async create(createCountryDto: CreateCountryDto, currentUser?: any): Promise<Country> {
        return this.countryModel.create({
          ...createCountryDto
        });
      }
}