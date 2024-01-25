import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostgreConfigModule } from './users/config.module';
import { PostgresConfigService } from './users/config.service';
import { ConfigModule } from '@nestjs/config';
import { Todo } from './todos/todo.entity';
import { TodoController } from './todos/todo.controller';
import { TodoService } from './todos/todo.service';
import * as cors from 'cors'; // Import cors module
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
        imports: [PostgreConfigModule],
        useClass: PostgresConfigService,
        inject: [PostgresConfigService],

      }
    ),
    UsersModule,
    TypeOrmModule.forFeature([Todo]),
    AuthModule
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    const allowedOrigins = ['http://localhost:3000'];
    const corsOptions: cors.CorsOptions = {
      origin: (origin: string | undefined, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    };

    // Enable CORS for all routes
    consumer.apply(cors(corsOptions)).forRoutes('*');
  }
}
