export class CustomerOutputDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date | undefined;
  password?: string;
}
