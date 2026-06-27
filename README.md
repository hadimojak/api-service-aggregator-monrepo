## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Docker

docker compose --env-file .env.dev up -d
docker compose --env-file .env.dev down -v

docker compose --env-file .env.stage up -d
docker compose --env-file .env.stage down -v

docker compose --env-file .env.prod up -d
docker compose --env-file .env.prod down -v

## enviroment

we should have three diffrent env file likes this :
.env.dev|.env.stage|.env.prod

## migrations script guide

npm run mig:gen:dev --name=name
npm run mig:run:one --name=name
## tree


```
monorepo
├─ .prettierrc
├─ apps
│  ├─ api-service
│  │  ├─ src
│  │  │  ├─ api.controller.ts
│  │  │  ├─ api.module.ts
│  │  │  ├─ api.service.ts
│  │  │  ├─ entities
│  │  │  │  └─ api.entity.ts
│  │  │  └─ main.ts
│  │  └─ tsconfig.app.json
│  ├─ auth-service
│  │  ├─ src
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.module.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ dto
│  │  │  │  ├─ auth-response.dto.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ login.dto.ts
│  │  │  │  ├─ refresh-token.dto.ts
│  │  │  │  └─ signup.dto.ts
│  │  │  ├─ guards
│  │  │  │  ├─ jwt-auth.guard.ts
│  │  │  │  └─ roles.guard.ts
│  │  │  ├─ main.ts
│  │  │  └─ strategies
│  │  │     ├─ jwt-refresh.strategy.ts
│  │  │     └─ jwt.strategy.ts
│  │  └─ tsconfig.app.json
│  ├─ gateway-api
│  │  ├─ src
│  │  │  ├─ gateway-api.controller.ts
│  │  │  ├─ gateway-api.module.ts
│  │  │  ├─ gateway-api.service.ts
│  │  │  └─ main.ts
│  │  └─ tsconfig.app.json
│  ├─ notification-service
│  │  ├─ src
│  │  │  ├─ entities
│  │  │  │  └─ notification.entity.ts
│  │  │  ├─ main.ts
│  │  │  ├─ notification.controller.ts
│  │  │  ├─ notification.module.ts
│  │  │  └─ notification.service.ts
│  │  └─ tsconfig.app.json
│  ├─ provider-service
│  │  ├─ src
│  │  │  ├─ entities
│  │  │  │  └─ provider.entity.ts
│  │  │  ├─ interfaces
│  │  │  │  └─ base-provider.interface.ts
│  │  │  ├─ main.ts
│  │  │  ├─ provider.controller.ts
│  │  │  ├─ provider.module.ts
│  │  │  └─ provider.service.ts
│  │  └─ tsconfig.app.json
│  ├─ tenant-service
│  │  ├─ src
│  │  │  ├─ entities
│  │  │  │  └─ tenant.entity.ts
│  │  │  ├─ main.ts
│  │  │  ├─ tenant.controller.ts
│  │  │  ├─ tenant.module.ts
│  │  │  └─ tenant.service.ts
│  │  └─ tsconfig.app.json
│  ├─ user-service
│  │  ├─ src
│  │  │  ├─ entities
│  │  │  │  └─ user.entity.ts
│  │  │  ├─ main.ts
│  │  │  ├─ user.controller.ts
│  │  │  ├─ user.module.ts
│  │  │  └─ user.service.ts
│  │  └─ tsconfig.app.json
│  └─ wallet-service
│     ├─ src
│     │  ├─ entities
│     │  │  └─ wallet.entity.ts
│     │  ├─ main.ts
│     │  ├─ wallet.controller.ts
│     │  ├─ wallet.module.ts
│     │  └─ wallet.service.ts
│     └─ tsconfig.app.json
├─ eslint.config.mjs
├─ libs
│  ├─ cache
│  │  ├─ src
│  │  │  ├─ cache.module.ts
│  │  │  ├─ cache.service.ts
│  │  │  ├─ index.ts
│  │  │  └─ redis
│  │  │     ├─ redis.module.ts
│  │  │     └─ redis.service.ts
│  │  └─ tsconfig.lib.json
│  ├─ common
│  │  ├─ src
│  │  │  ├─ common.module.ts
│  │  │  ├─ common.service.ts
│  │  │  ├─ config
│  │  │  │  ├─ config.constant.ts
│  │  │  │  ├─ config.module.ts
│  │  │  │  ├─ config.service.ts
│  │  │  │  └─ model
│  │  │  │     ├─ configuration.schema.ts
│  │  │  │     └─ env.validation.interface.ts
│  │  │  ├─ dto
│  │  │  │  ├─ provider-create.dto.ts
│  │  │  │  ├─ provider-filtere.dto.ts
│  │  │  │  ├─ request-create-log.dto.ts
│  │  │  │  ├─ result-modify.dto.ts
│  │  │  │  ├─ tenant-create.dto.ts
│  │  │  │  └─ tenant-filter.dto.ts
│  │  │  ├─ guards
│  │  │  │  └─ tenant.auth.guard.ts
│  │  │  ├─ index.ts
│  │  │  └─ types
│  │  │     └─ peginate-result.type.ts
│  │  └─ tsconfig.lib.json
│  ├─ database
│  │  ├─ src
│  │  │  ├─ data-source.ts
│  │  │  ├─ database.module.ts
│  │  │  ├─ database.service.ts
│  │  │  └─ index.ts
│  │  └─ tsconfig.lib.json
│  ├─ log
│  │  ├─ src
│  │  │  ├─ consumers
│  │  │  │  └─ log.consumer.ts
│  │  │  ├─ entities
│  │  │  │  └─ request-log.entity.ts
│  │  │  ├─ index.ts
│  │  │  ├─ log.module.ts
│  │  │  └─ log.service.ts
│  │  └─ tsconfig.lib.json
│  └─ queue
│     ├─ src
│     │  ├─ index.ts
│     │  ├─ queue.module.ts
│     │  ├─ queue.service.ts
│     │  └─ rabbitmq
│     │     ├─ rabbitmq.module.ts
│     │     └─ rabbitmq.service.ts
│     └─ tsconfig.lib.json
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.build.json
└─ tsconfig.json

```
```
monorepo
├─ .prettierrc
├─ apps
│  ├─ api-service
│  │  ├─ src
│  │  │  ├─ api.controller.ts
│  │  │  ├─ api.module.ts
│  │  │  ├─ api.service.ts
│  │  │  └─ main.ts
│  │  └─ tsconfig.app.json
│  ├─ auth-service
│  │  ├─ src
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.module.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ dto
│  │  │  │  ├─ auth-response.dto.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ login.dto.ts
│  │  │  │  ├─ refresh-token.dto.ts
│  │  │  │  └─ signup.dto.ts
│  │  │  ├─ guards
│  │  │  │  ├─ jwt-auth.guard.ts
│  │  │  │  └─ roles.guard.ts
│  │  │  ├─ main.ts
│  │  │  └─ strategies
│  │  │     ├─ jwt-refresh.strategy.ts
│  │  │     └─ jwt.strategy.ts
│  │  └─ tsconfig.app.json
│  ├─ gateway-api
│  │  ├─ src
│  │  │  ├─ gateway-api.controller.ts
│  │  │  ├─ gateway-api.module.ts
│  │  │  ├─ gateway-api.service.ts
│  │  │  └─ main.ts
│  │  └─ tsconfig.app.json
│  ├─ notification-service
│  │  ├─ src
│  │  │  ├─ main.ts
│  │  │  ├─ notification.controller.ts
│  │  │  ├─ notification.module.ts
│  │  │  └─ notification.service.ts
│  │  └─ tsconfig.app.json
│  ├─ provider-service
│  │  ├─ src
│  │  │  ├─ interfaces
│  │  │  │  └─ base-provider.interface.ts
│  │  │  ├─ main.ts
│  │  │  ├─ provider.controller.ts
│  │  │  ├─ provider.module.ts
│  │  │  └─ provider.service.ts
│  │  └─ tsconfig.app.json
│  ├─ tenant-service
│  │  ├─ src
│  │  │  ├─ main.ts
│  │  │  ├─ tenant.controller.ts
│  │  │  ├─ tenant.module.ts
│  │  │  └─ tenant.service.ts
│  │  └─ tsconfig.app.json
│  ├─ user-service
│  │  ├─ src
│  │  │  ├─ main.ts
│  │  │  ├─ user.controller.ts
│  │  │  ├─ user.module.ts
│  │  │  └─ user.service.ts
│  │  └─ tsconfig.app.json
│  └─ wallet-service
│     ├─ src
│     │  ├─ main.ts
│     │  ├─ wallet.controller.ts
│     │  ├─ wallet.module.ts
│     │  └─ wallet.service.ts
│     └─ tsconfig.app.json
├─ eslint.config.mjs
├─ libs
│  ├─ cache
│  │  ├─ src
│  │  │  ├─ cache.module.ts
│  │  │  ├─ cache.service.ts
│  │  │  ├─ index.ts
│  │  │  └─ redis
│  │  │     ├─ redis.module.ts
│  │  │     └─ redis.service.ts
│  │  └─ tsconfig.lib.json
│  ├─ common
│  │  ├─ src
│  │  │  ├─ common.module.ts
│  │  │  ├─ common.service.ts
│  │  │  ├─ config
│  │  │  │  ├─ config.constant.ts
│  │  │  │  ├─ config.module.ts
│  │  │  │  ├─ config.service.ts
│  │  │  │  └─ model
│  │  │  │     ├─ configuration.schema.ts
│  │  │  │     └─ env.validation.interface.ts
│  │  │  ├─ dto
│  │  │  │  ├─ provider-create.dto.ts
│  │  │  │  ├─ provider-filtere.dto.ts
│  │  │  │  ├─ request-create-log.dto.ts
│  │  │  │  ├─ result-modify.dto.ts
│  │  │  │  ├─ tenant-create.dto.ts
│  │  │  │  └─ tenant-filter.dto.ts
│  │  │  ├─ guards
│  │  │  │  └─ tenant.auth.guard.ts
│  │  │  ├─ index.ts
│  │  │  └─ types
│  │  │     └─ peginate-result.type.ts
│  │  └─ tsconfig.lib.json
│  ├─ database
│  │  ├─ src
│  │  │  ├─ data-source.ts
│  │  │  ├─ database.module.ts
│  │  │  ├─ database.service.ts
│  │  │  └─ index.ts
│  │  └─ tsconfig.lib.json
│  ├─ log
│  │  ├─ src
│  │  │  ├─ consumers
│  │  │  │  └─ log.consumer.ts
│  │  │  ├─ entities
│  │  │  │  ├─ api.entity.ts
│  │  │  │  ├─ notification.entity.ts
│  │  │  │  ├─ provider.entity.ts
│  │  │  │  ├─ request-log.entity.ts
│  │  │  │  ├─ tenant.entity.ts
│  │  │  │  ├─ user.entity.ts
│  │  │  │  └─ wallet.entity.ts
│  │  │  ├─ index.ts
│  │  │  ├─ log.module.ts
│  │  │  └─ log.service.ts
│  │  └─ tsconfig.lib.json
│  └─ queue
│     ├─ src
│     │  ├─ index.ts
│     │  ├─ queue.module.ts
│     │  ├─ queue.service.ts
│     │  └─ rabbitmq
│     │     ├─ rabbitmq.module.ts
│     │     └─ rabbitmq.service.ts
│     └─ tsconfig.lib.json
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.build.json
└─ tsconfig.json

```