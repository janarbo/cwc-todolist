import { Injectable } from "@nestjs/common/decorators";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';



@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "janarbo",
            password: "123123",
            database: "todolist",
            entities: ["dist/**/**/*.entity{.ts,.js}"],
            synchronize: true,
            autoLoadEntities: true,
          };
        }
    }
