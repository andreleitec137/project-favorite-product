import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltRounds = 10;

  async hash(plain: string): Promise<string> {
    return await hash(plain, this.saltRounds);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return await compare(plain, hashed);
  }
}
