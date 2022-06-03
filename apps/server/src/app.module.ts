import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
