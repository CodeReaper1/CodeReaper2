import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { DoctorReview } from '../entities/doctor-review.entity';

const LEVEL_THRESHOLDS = [
  { min: 1500, level: 'EXPERT' },
  { min: 700, level: 'PLATINUM' },
  { min: 300, level: 'GOLD' },
  { min: 100, level: 'SILVER' },
  { min: 0, level: 'BRONZE' },
];

const POINTS: Record<string, number> = {
  AGREE: 10,
  PARTIALLY_AGREE: 5,
  DISAGREE: 2,
};

@Injectable()
export class ReputationService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(DoctorReview) private reviewRepo: Repository<DoctorReview>,
  ) {}

  async updateScore(doctorId: string, decision: string) {
    const points = POINTS[decision] ?? 2;
    const doctor = await this.userRepo.findOne({ where: { id: doctorId } });
    if (!doctor) return;

    doctor.reputationScore += points;
    doctor.level = this.computeLevel(doctor.reputationScore);
    await this.userRepo.save(doctor);
  }

  async getReputation(doctorId: string) {
    const user = await this.userRepo.findOne({
      where: { id: doctorId },
      select: ['reputationScore', 'level', 'specialty', 'name'],
    });
    const reviewCount = await this.reviewRepo.count({ where: { doctorId } });
    const nextLevel = this.nextLevelInfo(user?.reputationScore ?? 0);
    return { ...user, reviewCount, nextLevel };
  }

  private computeLevel(score: number): string {
    for (const { min, level } of LEVEL_THRESHOLDS) {
      if (score >= min) return level;
    }
    return 'BRONZE';
  }

  private nextLevelInfo(score: number) {
    const currentIdx = LEVEL_THRESHOLDS.findIndex(t => score >= t.min);
    if (currentIdx > 0) {
      const next = LEVEL_THRESHOLDS[currentIdx - 1];
      return { level: next.level, pointsNeeded: next.min - score };
    }
    return null;
  }
}
