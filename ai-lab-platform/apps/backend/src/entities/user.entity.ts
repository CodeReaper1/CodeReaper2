import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { LabResult } from './lab-result.entity';
import { DoctorReview } from './doctor-review.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'PATIENT' })
  role: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  specialty: string;

  @Column({ default: 0 })
  reputationScore: number;

  @Column({ default: 'BRONZE' })
  level: string;

  @Column({ default: false })
  verified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => LabResult, lab => lab.patient)
  labResults: LabResult[];

  @OneToMany(() => DoctorReview, review => review.doctor)
  reviews: DoctorReview[];
}
