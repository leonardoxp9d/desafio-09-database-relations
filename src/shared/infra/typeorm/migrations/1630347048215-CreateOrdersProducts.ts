import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateOrdersProducts1630347048215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders_products',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10, // quantidade de números antes da vírgula
                        scale: 2, // quantidade de números depois da vírgula
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders_products');
    }

}

/** Essa vai ser uma tabela pivo, vai ser o relacionamento entre pedido e produto */