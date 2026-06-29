import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorReview } from '../entities/doctor-review.entity';
import { LabsService } from '../labs/labs.service';
import { ReputationService } from '../reputation/reputation.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(DoctorReview) private reviewRepo: Repository<DoctorReview>,
    private labsService: LabsService,
    private reputationService: ReputationService,
  ) {}

  async getQueue(doctorId: string) {
    return this.labsService.findQueueForDoctor(doctorId);
  }

  async getLabForReview(labId: string) {
    return this.labsService.findForDoctorReview(labId);
  }

  async submitReview(doctorId: string, dto: CreateReviewDto) {
    const existing = await this.reviewRepo.findOne({
      where: { doctorId, labResultId: dto.labResultId },
    });
    if (existing) throw new ConflictException('Already reviewed this lab result');

    const review = this.reviewRepo.create({
      doctorId,
      labResultId: dto.labResultId,
      decision: dto.decision,
      notes: dto.notes,
      reasonCode: dto.reasonCode,
    });
    await this.reviewRepo.save(review);

    await this.reputationService.updateScore(doctorId, dto.decision);

    return review;
  }

  async getMyReviews(doctorId: string) {
    return this.reviewRepo.find({
      where: { doctorId },
      order: { createdAt: 'DESC' },
      relations: ['labResult'],
    });
  }
}
