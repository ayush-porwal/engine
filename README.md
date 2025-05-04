# Engine

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

## Run tasks

To run the dev server for your app, use:

```sh
docker-compose up
npm i
npm run start
```

## Project Overview

Engine is a distributed microservices architecture that demonstrates a modern approach to handling distributed job execution with message queuing, authentication, and execution services. Built using NestJS and organized as an Nx monorepo, this project showcases:

- **Microservices Communication**: gRPC communication between services
- **Authentication**: JWT-based authentication service with Prisma ORM
- **Message Queuing**: Apache Pulsar integration for reliable job distribution
- **GraphQL API**: Apollo-powered GraphQL endpoints for job submission and management

The system consists of three main services:

- **engine-auth**: Authentication service with gRPC interface and GraphQL API
- **engine-jobs**: Job submission service that validates, schedules, and queues jobs
- **engine-executer**: Worker service that processes jobs from the message queue

This project demonstrates how we can build a distributed job processing system with secure authentication and reliable message delivery between services.

launch

```bash
http://localhost:3000/graphql
http://localhost:3001/graphql
```

to test the application
