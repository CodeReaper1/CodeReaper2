import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('queue')
  @Roles('DOCTOR')
  getQueue(@Request() req: any) {
    return this.reviewsService.getQueue(req.user.id);
  }

  @Get('lab/:id')
  @Roles('DOCTOR')
  getLabForReview(@Param('id') id: string) {
    return this.reviewsService.getLabForReview(id);
  }

  @Post()
  @Roles('DOCTOR')
  submitReview(@Request() req: any, @Body() dto: CreateReviewDto) {
    return this.reviewsService.submitReview(req.user.id, dto);
  }

  @Get('mine')
  @Roles('DOCTOR')
  getMyReviews(@Request() req: any) {
    return this.reviewsService.getMyReviews(req.user.id);
  }
}
