import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ReputationService } from './reputation.service';

@Controller('reputation')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReputationController {
  constructor(private reputationService: ReputationService) {}

  @Get('me')
  @Roles('DOCTOR')
  getMyReputation(@Request() req: any) {
    return this.reputationService.getReputation(req.user.id);
  }
}
