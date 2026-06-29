import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { AiService } from './ai.service';
import { LabResult } from '../entities/lab-result.entity';
import { DoctorReview } from '../entities/doctor-review.entity';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class LabsService {
  constructor(
    @InjectRepository(LabResult) private labRepo: Repository<LabResult>,
    @InjectRepository(DoctorReview) private reviewRepo: Repository<DoctorReview>,
    private aiService: AiService,
  ) {}

  async uploadAndProcess(patientId: string, file: Express.Multer.File) {
    let text = '';
    try {
      const parsed = await (pdfParse as any)(file.buffer);
      text = parsed.text;
    } catch {
      text = '';
    }

    const analysis = this.aiService.analyze(text);

    const lab = this.labRepo.create({
      patientId,
      fileName: file.originalname,
      markers: JSON.stringify(analysis.markers),
      aiSummary: analysis.summary,
      flags: JSON.stringify(analysis.flags),
      riskLevel: analysis.riskLevel,
    });
    await this.labRepo.save(lab);

    return this.format(lab);
  }

  async findAllForPatient(patientId: string) {
    const labs = await this.labRepo.find({
      where: { patientId },
      order: { createdAt: 'DESC' },
    });
    return labs.map(this.format);
  }

  async findOne(id: string, userId: string, role: string) {
    const lab = await this.labRepo.findOne({
      where: { id },
      relations: ['reviews', 'reviews.doctor'],
    });
    if (!lab) throw new NotFoundException('Lab result not found');
    if (role === 'PATIENT' && lab.patientId !== userId) throw new ForbiddenException();
    return this.format(lab);
  }

  async findForDoctorReview(id: string) {
    const lab = await this.labRepo.findOne({
      where: { id },
      relations: ['reviews'],
    });
    if (!lab) throw new NotFoundException('Lab result not found');
    const { patientId, patient, ...anonymous } = lab as any;
    return this.format(anonymous);
  }

  async requestDoctorReview(id: string, patientId: string) {
    const lab = await this.labRepo.findOne({ where: { id } });
    if (!lab) throw new NotFoundException();
    if (lab.patientId !== patientId) throw new ForbiddenException();
    lab.reviewRequested = true;
    return this.labRepo.save(lab);
  }

  async findQueueForDoctor(doctorId: string) {
    const reviewed = await this.reviewRepo.find({
      where: { doctorId },
      select: ['labResultId'],
    });
    const reviewedIds = reviewed.map(r => r.labResultId);

    const whereClause: any = { reviewRequested: true };
    if (reviewedIds.length > 0) {
      whereClause.id = Not(In(reviewedIds));
    }

    const labs = await this.labRepo.find({
      where: whereClause,
      order: { createdAt: 'ASC' },
      take: 20,
    });

    return labs.map(lab => {
      const { patientId, patient, ...safe } = lab as any;
      return this.format(safe);
    });
  }

  format = (lab: any) => ({
    ...lab,
    markers: typeof lab.markers === 'string' ? JSON.parse(lab.markers) : lab.markers,
    flags: typeof lab.flags === 'string' ? JSON.parse(lab.flags) : lab.flags,
  });
}
