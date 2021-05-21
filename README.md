<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

This poject is using NestJS Framework, TypeORM, Postgres Database and for sure the RabbitMQ Integrations.

## Installation

```bash
$ npm install
```

Before running the application, make sure that you already setup the enviroment file.
Also for the rabbitMQ you need to configure the exchange.

### RabbitMQ Configurations

```bash
create an Exchange called by: dot-test
# list of queue & Routing Key:
- post-sync   : sync
- post-create : create
- post-comment: comment
- post-update : update
- post-patch  : patch
- post-delete : delete
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stay in touch

Author - [SamueL Ricko Perdana Putra](https://www.linkedin.com/in/samuelricko/)
