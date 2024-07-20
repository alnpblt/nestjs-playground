import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from 'src/providers/database/prisma/prisma/prisma.service';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class IsEmailExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: string): Promise<boolean> {
    return (
      (await this.prismaService.users.count({
        where: {
          email: value,
        },
      })) > 0
    );
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Email does not exist';
  }
}

export function IsEmailExist(validationOption?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      validator: IsEmailExistConstraint,
    });
  };
}
