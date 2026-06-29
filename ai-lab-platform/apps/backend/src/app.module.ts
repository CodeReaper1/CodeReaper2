import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LabsModule } from './labs/labs.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReputationModule } from './reputation/reputation.module';
import { AdminModule } from './admin/admin.module';
import { User } from './entities/user.entity';
import { LabResult } from './entities/lab-result.entity';
import { DoctorReview } from './entities/doctor-review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH || 'lab-platform.db',
      entities: [User, LabResult, DoctorReview],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    LabsModule,
    ReviewsModule,
    ReputationModule,
    AdminModule,
  ],
})
export class AppModule {}
