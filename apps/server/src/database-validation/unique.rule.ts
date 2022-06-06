import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueRule implements ValidatorConstraintInterface {
  propName = '';

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async validate(value: unknown, validationArguments: ValidationArguments): Promise<boolean> {
    this.propName = validationArguments.property;

    const repository = this.dataSource.getRepository(validationArguments.constraints[0]);

    const entity = await repository.findOneBy({ [this.propName]: value });

    return entity == null;
  }

  defaultMessage(): string {
    return `${this.propName} already existis.`;
  }
}
