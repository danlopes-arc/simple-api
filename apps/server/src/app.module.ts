import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppConfigModule } from './app-config/app-config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule,
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
