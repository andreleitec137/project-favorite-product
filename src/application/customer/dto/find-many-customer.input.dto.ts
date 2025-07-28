import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import CustomerEntity from 'src/domain/customer/entity/customer.entity';

class CustomerFilterDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

type OrderDirection = 'asc' | 'desc';

export class FindManyCustomerInputDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => CustomerFilterDTO)
  readonly filter?: CustomerFilterDTO;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  readonly skip?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  readonly take?: number;

  @IsOptional()
  readonly orderBy?: Partial<Record<keyof CustomerEntity, OrderDirection>>;
}
