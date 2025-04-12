# Press Inspection Software Backend

This is a NestJS-based backend for a Press Inspection Software application. It provides a robust API for managing and monitoring press inspection operations in manufacturing and printing industries.

## Features

- User authentication and role-based access control
- Company hierarchy management (companies, plants, departments, production lines)
- Equipment management and configuration
- Inspection job configuration and monitoring
- Quality parameters and defect type management
- Alert configurations and notifications

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd press-inspection-backend

# Install dependencies
npm install
```

## Configuration

1. Create a `.env` file in the root directory based on the `.env.example` template:

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

2. Configure your PostgreSQL database settings in the `.env` file.

## Running the application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## Database Seeding

To seed the database with initial data for development:

```bash
npm run seed
```

This will create:
- Default roles (admin, manager, operator, inspector)
- A sample company structure
- Test users with different roles
- Sample equipment, defect types, and other required data

Default admin credentials:
- Email: admin@example.com
- Password: Password123!

## API Documentation

Swagger documentation is available at `http://localhost:3000/api/docs` when the application is running.

## Project Structure

```
src/
├── config/            # Configuration files
├── core/              # Core functionality (guards, interceptors, etc.)
├── modules/           # Feature modules
│   ├── auth/          # Authentication
│   ├── user/          # User management
│   ├── company/       # Company hierarchy
│   ├── equipment/     # Equipment management
│   ├── inspection/    # Inspection jobs and parameters
│   └── notification/  # Alert configurations
├── database/          # Database seeders and migrations
└── shared/            # Shared utilities and DTOs
```

## Development

### Adding a new entity

1. Create the entity file in the appropriate module's `entities` folder
2. Create DTOs in the module's `dto` folder
3. Add the entity to the module's imports in the `*.module.ts` file
4. Implement service methods in the `*.service.ts` file
5. Add controller endpoints in the `*.controller.ts` file

### Running tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

This project is licensed under the MIT License.