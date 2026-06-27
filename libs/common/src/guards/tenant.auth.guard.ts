import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from 'apps/tenant-service/src/entities/tenant.entity'; 

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    @InjectRepository(TenantEntity)
    private tenantRepo: Repository<TenantEntity>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const apiKey = req.headers['x-api-key'];

    if (!apiKey) throw new UnauthorizedException();

    const tenant = await this.tenantRepo.findOne({
      where: { apiKey: apiKey as string },
    });

    if (!tenant || !tenant.isActive) {
      throw new UnauthorizedException();
    }

    req.tenant = tenant;

    return true;
  }
}
