import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppConfigModule } from './app-config/app-config.module';
import { MessageModule } from './message/message.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
        children: [
          {
            path: '/',
            module: MessageModule,
          },
          {
            path: '/',
            module: UserModule,
          },
          {
            path: '/',
            module: AuthModule,
          },
        ],
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api/*'],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'simple-app-ci-cd.db',
      synchronize: true,
      entities: [User],
    }),
    AppConfigModule,
    MessageModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
