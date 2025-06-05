import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { UserModule } from '../user/user.module';
import { CountryController } from './country.controller';
import { Country } from './entities/country.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([Country]), UserModule],
    controllers: [CountryController],
    providers: [CountryService],
})
export class CountryModule {}