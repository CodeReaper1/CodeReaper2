import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';
import { AiService } from './ai.service';
import { LabResult } from '../entities/lab-result.entity';
import { DoctorReview } from '../entities/doctor-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabResult, DoctorReview])],
  controllers: [LabsController],
  providers: [LabsService, AiService],
  exports: [LabsService],
})
export class LabsModule {}
