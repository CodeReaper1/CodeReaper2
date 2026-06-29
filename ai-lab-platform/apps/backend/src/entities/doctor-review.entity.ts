import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { LabResult } from './lab-result.entity';

@Entity('doctor_reviews')
export class DoctorReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  doctorId: string;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'doctorId' })
  doctor: User;

  @Column()
  labResultId: string;

  @ManyToOne(() => LabResult, lab => lab.reviews)
  @JoinColumn({ name: 'labResultId' })
  labResult: LabResult;

  @Column()
  decision: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  reasonCode: string;

  @CreateDateColumn()
  createdAt: Date;
}
