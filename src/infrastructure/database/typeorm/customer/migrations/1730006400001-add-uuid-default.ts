import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUuidDefaultToCustomers1730006400001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1) ativa a extensão uuid-ossp, se ainda não existir
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    // 2) define default para geração de UUID na coluna id
    await queryRunner.query(`
      ALTER TABLE "customers"
      ALTER COLUMN "id"
      SET DEFAULT uuid_generate_v4();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // remove o default do id
    await queryRunner.query(`
      ALTER TABLE "customers"
      ALTER COLUMN "id"
      DROP DEFAULT;
    `);
    // opcional: remove a extensão
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
  }
}
