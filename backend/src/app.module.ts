import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { MeetingsModule } from './meetings/meetings.module';
import { RatingsModule } from './ratings/ratings.module';
import { CommunityModule } from './community/community.module';
import { GroupbuyModule } from './groupbuy/groupbuy.module';
import { HobbyModule } from './hobby/hobby.module';
import { HospitalModule } from './hospital/hospital.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { UploadModule } from './upload/upload.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') === 'development', // 프로덕션에서는 false로!
        logging: configService.get('NODE_ENV') === 'development',
      }),
    }),
    AuthModule,
    UsersModule,
    LocationsModule,
    MeetingsModule,
    RatingsModule,
    CommunityModule,
    GroupbuyModule,
    HobbyModule,
    HospitalModule,
    PaymentModule,
    NotificationModule,
    UploadModule,
    CommonModule,
  ],
})
export class AppModule {}

