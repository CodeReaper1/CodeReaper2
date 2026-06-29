import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReputationController } from './reputation.controller';
import { ReputationService } from './reputation.service';
import { User } from '../entities/user.entity';
import { DoctorReview } from '../entities/doctor-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, DoctorReview])],
  controllers: [ReputationController],
  providers: [ReputationService],
  exports: [ReputationService],
})
export class ReputationModule {}
