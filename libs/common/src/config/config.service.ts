import { Injectable } from '@nestjs/common';
import { config, AppConfig } from './config.constant';

@Injectable()
export class ConfigService {
  //make it static
  static readonly config: AppConfig = config;
}
