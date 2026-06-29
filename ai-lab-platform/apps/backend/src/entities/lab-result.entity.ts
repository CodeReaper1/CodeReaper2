import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { DoctorReview } from './doctor-review.entity';

@Entity('lab_results')
export class LabResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @ManyToOne(() => User, user => user.labResults)
  @JoinColumn({ name: 'patientId' })
  patient: User;

  @Column()
  fileName: string;

  @Column('text')
  markers: string;

  @Column('text')
  aiSummary: string;

  @Column('text')
  flags: string;

  @Column({ default: 'LOW' })
  riskLevel: string;

  @Column({ default: false })
  reviewRequested: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => DoctorReview, review => review.labResult)
  reviews: DoctorReview[];
}
