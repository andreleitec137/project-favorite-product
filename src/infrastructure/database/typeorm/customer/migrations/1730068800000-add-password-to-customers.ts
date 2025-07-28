import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPasswordToCustomers1730068800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'customers',
      new TableColumn({
        name: 'password',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('customers', 'password');
  }
}
