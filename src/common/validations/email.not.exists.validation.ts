import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from 'src/providers/database/prisma/prisma/prisma.service';

@ValidatorConstraint({ name: 'IsEmailNotExistConstraint', async: true })
@Injectable()
export class IsEmailNotExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: string): Promise<boolean> {
    return !(
      (await this.prisma.users.count({
        where: {
          email: value,
        },
      })) > 0
    );
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Email already exists';
  }
}

export function IsEmailNotExist(validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      validator: IsEmailNotExistConstraint,
    });
  };
}
