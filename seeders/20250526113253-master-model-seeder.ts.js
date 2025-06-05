'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('🌱 Starting Models seeding...');

    try {
      // Read seed data from JSON file
      const seedData = require('../seed-data/master-model-seed.json')

      // Prepare data for bulk insert with timestamps
      const modelsToInsert = seedData.models.map(modelData => ({
        // manufacturer: modelData.Manufacturer,
        model: modelData.Model,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      // Use bulkInsert with ignoreDuplicates to prevent duplicate entries
      await queryInterface.bulkInsert('models', modelsToInsert, {
        ignoreDuplicates: true, // This prevents duplicate errors
        validate: true,
      });

      console.log(`🎉 Models seeding completed!`);
      console.log(`📊 Processed ${modelsToInsert.length} models`);

    } catch (error) {
      console.error('❌ Error seeding models:', error);
      throw error;
    }
  },

  // down: async (queryInterface, Sequelize) => {
  //   console.log('🗑️  Rolling back Models seeding...');

  //   try {
  //     // Read the same seed data to know what to remove
  //     const seedDataPath = path.join(__dirname, '../seed-data/m_model_seed_data.json');
  //     const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));

  //     // Create array of conditions to match seeded records
  //     const whereConditions = seedData.models.map(modelData => ({
  //       manufacturer: modelData.Manufacturer,
  //       model: modelData.Model,
  //     }));

  //     // Remove seeded models
  //     for (const condition of whereConditions) {
  //       await queryInterface.bulkDelete('Models', condition);
  //     }

  //     console.log('✅ Models seeding rollback completed!');

  //   } catch (error) {
  //     console.error('❌ Error rolling back models seeding:', error);
  //     throw error;
  //   }
  // }
};
