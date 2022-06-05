import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppEnv } from './app.env';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get<TKey extends keyof AppEnv>(variable: TKey): AppEnv[TKey] {
    return this.configService.get<AppEnv[TKey]>(variable) as AppEnv[TKey];
  }
}
