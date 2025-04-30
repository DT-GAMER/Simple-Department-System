# **NestJS Authentication & GraphQL REST API with JWT**

This is a project built using **NestJS** to implement a basic authentication system with **signup** and **login** functionalities using JWT tokens for securing endpoints. It includes both **GraphQL** and **REST API** for handling different functionalities in the application. The application is divided into multiple modules where the **Department Module** uses **GraphQL**, and authentication, along with other services, uses **REST API** with JWT.

---

## **Table of Contents**
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Start the Server](#start-the-server)
  - [Accessing the Endpoints](#accessing-the-endpoints)
  - [GraphQL Playground](#graphql-playground)
  - [Swagger API Docs](#swagger-api-docs)
- [License](#license)

---

## **Features**
- **User Registration (Signup)**: Allows new users to sign up with a username and password.
- **User Login**: Generates a JWT access token when a user logs in.
- **GraphQL Integration**: Handles department-related functionality through GraphQL.
- **JWT Authentication**: Protects certain routes and GraphQL mutations with JWT tokens.
- **REST API Endpoints**: Provides `POST /auth/signup` and `POST /auth/login` endpoints.
- **Swagger Documentation**: Provides REST API documentation via Swagger UI for easy consumption of the API.
- **Validation**: Input validation using **class-validator** for both GraphQL and REST inputs.

---

## **Tech Stack**
- **NestJS**: A progressive Node.js framework for building scalable applications.
- **GraphQL**: A query language for APIs, used in the department module.
- **JWT**: JSON Web Tokens for secure authentication and authorization.
- **TypeORM**: A TypeScript ORM for managing database entities and migrations.
- **PostgreSQL**: Relational database to store user data.
- **class-validator**: Validation library for validating inputs.
- **Swagger**: API documentation tool for REST APIs.
- **Passport**: Middleware for handling authentication with JWT strategy.

---

## **Setup Instructions**

### Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js** (v14.x or above)
- **npm** (v6.x or above)
- **PostgreSQL** (running locally or on a cloud instance)

### Clone the Repository

```bash
git clone https://github.com/DT-GAMER/tactology_task.git
cd tactology_task
```

### Install Dependencies

Run the following command to install the project dependencies:
Please add `--legacy-peer-deps` when trying to install packages to avoid conflicts.

```bash
npm install --legacy-peer-deps
```

---

## **Configuration**

### Environment Variables

Ensure that the `.env` file is present in the root directory of the project. Below is a sample `.env` file:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_password
DB_NAME=your_db_name
DB_SSL=true
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=1d
```

You can update the environment variables as per your own credentials.

---

## **Usage**

### Start the Server

To start the application in development mode:

```bash
npm run start:dev
```

The server will start running locally on `http://localhost:3000`.

### LIVE ACCESS
**A Big And Sincere Note:** The project instruction is to deploy the project live on `Render.com` but I am not able to use Render because I am asked to enter my card and the dollar card with me is being rejected. So, to meet up and get the project done, I used `Coolify` which is running on my `Virtual Private Server`.

This project is running live on this public url `http://dkg4ockkww84s8gggk0cws0c.62.171.152.178.sslip.io`

### Accessing the Endpoints

#### **Auth Endpoints**
-**Swagger Doc** for authentication endpoint is accessible on `http://dkg4ockkww84s8gggk0cws0c.62.171.152.178.sslip.io/api/docs`

- **POST** `/auth/signup`: Used for signing up a new user. Accepts `username` and `password` in the request body.
- **POST** `/auth/login`: Used for logging in an existing user. Accepts `username` and `password` in the request body. Returns a JWT token.

#### **GraphQL Endpoint**
- **GraphQL Playground** is available at `http://dkg4ockkww84s8gggk0cws0c.62.171.152.178.sslip.io/graphql`. You can run department-related queries and mutations here.

---

### **GraphQL Playground**

The **GraphQL Playground** provides an interactive environment for testing and exploring GraphQL queries and mutations. **Note**: All GraphQL operations are protected and require a valid access token for authentication.

You must include the **Authorization header** with the **Bearer token** in your requests. For example:

```http
Authorization: Bearer <your-access-token>
```

#### **Create a Department with Sub-Departments**

This mutation creates a new department and includes sub-departments:

```graphql
mutation {
  createDepartment(createDepartmentInput: {
    name: "Engineering"
    subDepartments: [
      {
        name: "Backend"
      },
      {
        name: "Frontend"
      }
    ]
  }) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

#### **List All Departments**

This query retrieves all departments, including their sub-departments:

```graphql
query {
  departments {
    id
    name
    createdAt
    updatedAt
    subDepartments {
      id
      name
    }
  }
}
```

#### **Get a Single Department by ID**

This query retrieves a single department by its `id`, along with its sub-departments:

```graphql
query {
  department(id: 1) {
    id
    name
    createdAt
    updatedAt
    subDepartments {
      id
      name
    }
  }
}
```

#### **Update an Existing Department**

This mutation updates an existing department's name (or other fields as necessary):

```graphql
mutation {
  updateDepartment(
    id: 2
    updateDepartmentInput: {
      name: "Engineering and Tech"
    }
  ) {
    id
    name
    updatedAt
  }
}
```

#### **Delete a Department**

This mutation deletes an existing department by its `id`:

```graphql
mutation {
  deleteDepartment(id: 1)
}
```

#### **Add Sub-Departments to an Existing Department**

This mutation adds sub-departments to an existing department:

```graphql
mutation {
  addSubDepartmentsToDepartment(
    departmentId: 2
    subDepartments: [
      { name: "QA" },
      { name: "DevOps" }
    ]
  ) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

#### **Update a Sub-Department**

This mutation updates the name of an existing sub-department within a department:

```graphql
mutation {
  updateSubDepartment(
    id: 3
    updateSubDepartmentInput: { name: "Cloud Engineering" }
  ) {
    id
    name
  }
}
```

#### **Delete a Sub-Department**

This mutation deletes a sub-department by its `id`:

```graphql
mutation {
  deleteSubDepartment(id: 3)
}
```

---

### **GraphQL Query Breakdown**

- **Create Department**: Adds a new department with a list of sub-departments.
- **List Departments**: Fetches all departments along with their sub-departments.
- **Get Department by ID**: Fetches a specific department and its details, based on `id`.
- **Update Department**: Updates a department's name or other properties.
- **Delete Department**: Deletes a department by `id`.
- **Add Sub-Departments**: Adds multiple sub-departments to a specific department.
- **Update Sub-Department**: Allows updating the name of an existing sub-department.
- **Delete Sub-Department**: Deletes a sub-department by `id`.

---

### **Authentication and Authorization**

All GraphQL queries and mutations require an **access token** for authentication. The access token should be included in the **Authorization header** with the format:

```http
Authorization: Bearer <your-access-token>
```

To obtain an access token, you must **login** through the REST API's **/login** endpoint, providing your username and password. The response will contain the access token, which you will use in subsequent requests to access protected GraphQL endpoints.

---


### Swagger API Docs

After starting the server, you can access the **Swagger API Docs** at `http://localhost:3000/api/docs`.

---

### Breakdown:
- **auth**: This module contains everything related to user authentication, such as login, signup, JWT strategies, and guards.
- **department**: The GraphQL module that handles all department-related queries and mutations.
- **common**: Contains common utilities such as filters, interceptors.
- **config**: Configuration files for TypeORM, GraphQL, and JWT settings.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
