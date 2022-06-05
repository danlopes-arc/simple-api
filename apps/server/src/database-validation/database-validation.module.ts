import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../utils/entities';
import { UniqueRule } from './unique.rule';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [UniqueRule],
  exports: [UniqueRule],
})
export class DatabaseValidationModule {}
