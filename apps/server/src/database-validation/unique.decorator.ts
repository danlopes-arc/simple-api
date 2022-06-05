import { ClassConstructor } from 'class-transformer';
import { ValidationOptions, registerDecorator } from 'class-validator';
import { UniqueRule } from './unique.rule';

export function IsUnique(entity: ClassConstructor<unknown>, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueRule,
      constraints: [entity],
    });
  };
}
