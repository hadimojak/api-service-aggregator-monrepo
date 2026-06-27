import * as Joi from 'joi';
import { envValidationInterface } from './env.validation.interface';

export const ConfigValidationSchema = Joi.object<envValidationInterface>({
  PORT: Joi.number().port().default(3000),
  //redis
  REDIS_HOST: Joi.string().hostname().required(),
  REDIS_PORT: Joi.number().port().default(6379),
  REDIS_PASS: Joi.string().min(6).required(),
  //rabbit
  RABBITMQ_HOST: Joi.string().hostname().required(),
  RABBITMQ_USER: Joi.string().alphanum().min(3).required(),
  RABBITMQ_PASS: Joi.string().min(6).required(),
  RABBITMQ_PORT: Joi.number().port().default(4067),
  RBT_SERVICE_NAME: Joi.string().default('RABBITMQ_SERVICE'),
  REQUEST_LOG_QUEUE: Joi.string().default('DEFAULT'),
  //postgress
  POSTGRES_HOST: Joi.string().hostname().required(),
  POSTGRES_PORT: Joi.number().port().default(5432),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().alphanum().min(3).required(),
  POSTGRES_PASSWORD: Joi.string().min(6).required(),
  //jwt
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
  //api
  API_PREFIX: Joi.string().required(),
}).unknown(true);
