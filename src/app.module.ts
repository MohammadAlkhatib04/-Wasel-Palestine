import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CheckpointModule } from './checkpoint/checkpoint.module';
import { ReportModule } from './report/report.module';
import { AppService } from './app.service';
import { CheckpointStatusHistoryModule } from './checkpoint-status-history/checkpoint-status-history.module';
import { IncidentModule } from './incident/incident.module';
import { AlertSubscriptionModule } from './alert-subscription/alert-subscription.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<number>('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        synchronize: process.env.NODE_ENV !== 'production',
        autoLoadEntities: true,
      }),
    }),

    UserModule,
    CheckpointModule,
    CheckpointStatusHistoryModule,
    IncidentModule,
    ReportModule,
    AlertSubscriptionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
