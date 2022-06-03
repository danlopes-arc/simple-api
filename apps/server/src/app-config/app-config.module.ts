import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { parseClassFactory } from 'src/utils/class-parser';
import { AppConfigService } from './app-config.service';
import { AppEnv } from './app.env';

@Module({
  providers: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      validate: parseClassFactory(AppEnv, { transformOptions: { enableImplicitConversion: true } }),
    }),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
