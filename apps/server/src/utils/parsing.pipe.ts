import { ValidationPipe, BadRequestException } from '@nestjs/common';

export const ParsingPipe = new ValidationPipe({
  transform: true,
  exceptionFactory: (errors) => {
    const validationErrors: Record<string, string[]> = {};

    errors.forEach((validationError) => {
      validationErrors[validationError.property] = Object.values(validationError.constraints ?? {});
    });
    throw new BadRequestException({ validationErrors });
  },
});
