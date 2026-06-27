export interface envValidationInterface {
  PORT: number;

  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASS: string;

  RABBITMQ_HOST: string;
  RABBITMQ_USER: string;
  RABBITMQ_PASS: string;
  RABBITMQ_PORT: number;
  RBT_SERVICE_NAME: string;
  REQUEST_LOG_QUEUE: string;

  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;

  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;
  API_PREFIX: string;
}
