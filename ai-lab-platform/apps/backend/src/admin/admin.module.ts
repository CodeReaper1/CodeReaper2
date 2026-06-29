import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../entities/user.entity';
import { LabResult } from '../entities/lab-result.entity';
import { DoctorReview } from '../entities/doctor-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, LabResult, DoctorReview])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
