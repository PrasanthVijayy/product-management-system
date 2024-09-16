# Product Management System

## Overview

The Product Management System (PMS) is a REST API designed for managing products and product categories. It supports CRUD operations, filtering, sorting, and integrates with a MySQL database. The application is scalable, secure, and optimized for performance.

## Table of Contents

- [Running the Application](#running-the-application)
  - [Locally](#locally)
  - [With Docker](#with-docker)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)

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
   Run the following command to execute the test suite:
   ```bash
   npm test
   ```

   This will run all unit and integration tests defined in the `test` directory using Jest.

## API Documentation

- **API Documentation**: The API documentation is available at [http://localhost:4001/api-docs](http://localhost:4001/api-docs). This link provides detailed information about the API endpoints, request parameters, and response formats.
