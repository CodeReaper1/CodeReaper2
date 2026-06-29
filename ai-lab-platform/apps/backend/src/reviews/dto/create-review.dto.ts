import { IsString, IsIn, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  labResultId: string;

  @IsIn(['AGREE', 'PARTIALLY_AGREE', 'DISAGREE'])
  decision: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsIn(['INCORRECT_RANGE', 'MISSING_CONTEXT', 'NORMAL_VARIATION', 'ADDITIONAL_TEST_NEEDED'])
  reasonCode?: string;
}
