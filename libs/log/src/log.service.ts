import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestLogEntity } from './entities/request-log.entity';
import { CreateRequestLogDto } from '@app/common/dto/request-create-log.dto'; 

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(RequestLogEntity)
    private readonly requestLogRepo: Repository<RequestLogEntity>,
  ) {}

  async createLog(payload: CreateRequestLogDto): Promise<RequestLogEntity> {
    const log = this.requestLogRepo.create(payload);

    return this.requestLogRepo.save(log);
  }
}
