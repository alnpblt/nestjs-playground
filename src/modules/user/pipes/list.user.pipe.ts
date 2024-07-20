import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ListUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.id !== undefined) {
      value.id = Number(value.id);
    }
    if (value.role_id !== undefined) {
      value.role_id = Number(value.role_id);
    }
    if (value.created_from !== undefined) {
      value.created_from = new Date(value.created_from);
    }
    if (value.created_to !== undefined) {
      value.created_to = new Date(value.created_to);
    }
    return value;
  }
}
