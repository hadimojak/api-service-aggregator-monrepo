import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1782571697762 implements MigrationInterface {
    name = 'Name1782571697762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" numeric(15,2) NOT NULL DEFAULT '0', "currency" character varying(3) NOT NULL DEFAULT 'IRR', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, CONSTRAINT "REL_35472b1fe48b6330cd34970956" UNIQUE ("userId"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "phoneNumber" character varying(10) NOT NULL, "passwordHash" character varying(255) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'tenant', "isActive" boolean NOT NULL DEFAULT true, "refreshTokenHash" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "tenantId" uuid, "walletId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"), CONSTRAINT "REL_685bf353c85f23b6f848e4dcde" UNIQUE ("tenantId"), CONSTRAINT "REL_922e8c1d396025973ec81e2a40" UNIQUE ("walletId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "message" text NOT NULL, "type" "public"."notification_type_enum" NOT NULL DEFAULT 'info', "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "readAt" TIMESTAMP, "deletedAt" TIMESTAMP, "tenantId" uuid NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "providerName" character varying NOT NULL, "endpoint" character varying NOT NULL, "request" json, "response" json, "status" integer NOT NULL, "latency" integer NOT NULL, "errorMessage" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "tenantId" uuid NOT NULL, CONSTRAINT "PK_ae393b42f50b0399df4c90160d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(255) NOT NULL, "type" character varying NOT NULL, "baseUrl" character varying NOT NULL, "apiKey" character varying NOT NULL, "priority" integer NOT NULL DEFAULT '1', "isActive" boolean NOT NULL DEFAULT true, "timeout" integer NOT NULL DEFAULT '10000', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_8da0db8c3fabde91d783af1fe09" UNIQUE ("code"), CONSTRAINT "UQ_dc1195d6fce67baf8f039c452bb" UNIQUE ("baseUrl"), CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "api" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "endpoint" character varying(500) NOT NULL, "method" character varying(10) NOT NULL, "description" text, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "providerId" uuid NOT NULL, "tenantId" uuid NOT NULL, CONSTRAINT "UQ_8ce91749da904c1cb16bb4e06c1" UNIQUE ("name"), CONSTRAINT "PK_12f6cbe9e79197c2bf4c79c009d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "apiKey" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "rateLimitPerMin" integer NOT NULL DEFAULT '100', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, CONSTRAINT "UQ_993d708a67a5e494948468ef6d8" UNIQUE ("apiKey"), CONSTRAINT "REL_a6719c3ba1ea75a8f255e3e5c7" UNIQUE ("userId"), CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_685bf353c85f23b6f848e4dcded" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_922e8c1d396025973ec81e2a402" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_734235b45e4310eb80816139bcf" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request_log" ADD CONSTRAINT "FK_52552ac089eb5e0c8824d7d4681" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "api" ADD CONSTRAINT "FK_3ab4d04e09258c227e0423850bf" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "api" ADD CONSTRAINT "FK_0f0bd679ed0b029f942653c2020" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD CONSTRAINT "FK_a6719c3ba1ea75a8f255e3e5c7d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant" DROP CONSTRAINT "FK_a6719c3ba1ea75a8f255e3e5c7d"`);
        await queryRunner.query(`ALTER TABLE "api" DROP CONSTRAINT "FK_0f0bd679ed0b029f942653c2020"`);
        await queryRunner.query(`ALTER TABLE "api" DROP CONSTRAINT "FK_3ab4d04e09258c227e0423850bf"`);
        await queryRunner.query(`ALTER TABLE "request_log" DROP CONSTRAINT "FK_52552ac089eb5e0c8824d7d4681"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_734235b45e4310eb80816139bcf"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_922e8c1d396025973ec81e2a402"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_685bf353c85f23b6f848e4dcded"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"`);
        await queryRunner.query(`DROP TABLE "tenant"`);
        await queryRunner.query(`DROP TABLE "api"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "request_log"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
    }

}
