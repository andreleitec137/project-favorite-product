import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUuidDefaultToCustomers1730006400001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
      ALTER TABLE "customers"
      ALTER COLUMN "id"
      SET DEFAULT uuid_generate_v4();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "customers"
      ALTER COLUMN "id"
      DROP DEFAULT;
    `);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
  }
}
