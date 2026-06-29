import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findById(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) return null;
    const { passwordHash, ...rest } = user as any;
    return rest;
  }

  async findAllDoctors() {
    return this.userRepo.find({
      where: { role: 'DOCTOR' },
      select: ['id', 'name', 'specialty', 'reputationScore', 'level'],
    });
  }
}
