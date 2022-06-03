import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MessageModule } from './message/message.module';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
  imports: [
    AppConfigModule,
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
        children: [
          {
            path: '/',
            module: MessageModule,
          },
        ],
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),
    MessageModule,
  ],
})
export class AppModule {}
