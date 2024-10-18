# Product Management System

## Overview

The Product Management System (PMS) is a robust application designed to manage products and product categories through both REST and GraphQL APIs. It features comprehensive support for CRUD operations, advanced filtering, and sorting capabilities. Leveraging Sequelize as an ORM for MySQL, the application ensures efficient database interactions.

To enhance performance and scalability, the system incorporates Redis for caching, which significantly improves data retrieval times and reduces load on the database. The application is designed with scalability and security in mind, making it suitable for high-demand environments.

## Table of Contents

- [Running the Application](#running-the-application)
  - [Locally](#locally)
  - [With Docker](#with-docker)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)
- [API Collections](/API/API%20postmanCollection.json)

## Running the Application

### Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/PrasanthVijayy/product-management-system.git
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` File**:
   Copy the example `.env` file and adjust the configuration as needed:

   ```bash
   cp .env.example .env
   ```

4. **Run the Application**:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:4001`.

### With Docker

1. **Build and Start Containers**:
   Ensure Docker and Docker Compose are installed, then run:

   ```bash
   docker-compose up --build
   ```

   This command builds the Docker images and starts the containers. The application will be available at `http://localhost:4001`.

2. **Environment Variables**:
   Make sure your `.env` file is correctly configured and located in the root directory of your project. Docker will automatically load these variables.

## Running Tests

1. **Unit and Integration Tests**:
   Folder for [Unit Test](/tests/restAPI/unitTesting/)
   Folder for [Integration Test](/tests/restAPI/intergration/)

   Run the following command to execute the test suite:

   ```bash
   npm test
   ```

   This will run all unit and integration tests defined in the `test` directory using Jest.

2. **Test Status**:
   To view the test status and results in a more readable format, an HTML report is generated after test execution. You can open the generated HTML file to see a detailed view of the test results.
   The HTML report is usually located in the `test/reports.html` file, and you can open it with any web browser.

## API Documentation

- **API Documentation**: The API documentation is available at [http://localhost:4001/api-docs](http://localhost:4001/api-docs). This link provides detailed information about the API endpoints, request parameters, and response formats.
