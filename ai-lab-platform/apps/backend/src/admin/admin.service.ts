import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LabResult } from '../entities/lab-result.entity';
import { DoctorReview } from '../entities/doctor-review.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(LabResult) private labRepo: Repository<LabResult>,
    @InjectRepository(DoctorReview) private reviewRepo: Repository<DoctorReview>,
  ) {}

  async getStats() {
    const [patients, doctors, labs, reviews] = await Promise.all([
      this.userRepo.count({ where: { role: 'PATIENT' } }),
      this.userRepo.count({ where: { role: 'DOCTOR' } }),
      this.labRepo.count(),
      this.reviewRepo.count(),
    ]);

    const topDoctors = await this.userRepo.find({
      where: { role: 'DOCTOR' },
      order: { reputationScore: 'DESC' },
      take: 5,
      select: ['name', 'reputationScore', 'level', 'specialty'],
    });

    return { patients, doctors, labs, reviews, topDoctors };
  }
}
