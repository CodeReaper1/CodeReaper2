import {
  Controller, Post, Get, Param, Request, UseGuards,
  UseInterceptors, UploadedFile, Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { LabsService } from './labs.service';

@Controller('labs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LabsController {
  constructor(private labsService: LabsService) {}

  @Post('upload')
  @Roles('PATIENT')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  upload(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
    return this.labsService.uploadAndProcess(req.user.id, file);
  }

  @Get()
  @Roles('PATIENT')
  getMyLabs(@Request() req: any) {
    return this.labsService.findAllForPatient(req.user.id);
  }

  @Get(':id')
  getOne(@Param('id') id: string, @Request() req: any) {
    return this.labsService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id/request-review')
  @Roles('PATIENT')
  requestReview(@Param('id') id: string, @Request() req: any) {
    return this.labsService.requestDoctorReview(id, req.user.id);
  }
}
