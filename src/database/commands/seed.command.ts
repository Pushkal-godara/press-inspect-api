import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InitialDataSeeder } from '../seeders/initial-data.seeder';

@Injectable()
export class SeedCommand {
  constructor(private readonly initialDataSeeder: InitialDataSeeder) {}

  @Command({
    command: 'seed:initial',
    describe: 'Seed initial data for development',
  })
  async seed() {
    try {
      await this.initialDataSeeder.seed();
      console.log('Initial data seeded successfully');
    } catch (error) {
      console.error('Error seeding initial data:', error);
    }
  }
}