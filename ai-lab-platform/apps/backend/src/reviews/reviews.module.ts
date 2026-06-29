import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { LabsModule } from '../labs/labs.module';
import { ReputationModule } from '../reputation/reputation.module';
import { DoctorReview } from '../entities/doctor-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorReview]), LabsModule, ReputationModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
