import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ScheduleShiftPattern } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ScheduleInputDto } from './schedule-input.dto';
import { ScheduleShiftPatternService } from './schedule-shift-pattern.service';

@UseGuards(JwtAuthGuard)
@Controller('schedule')
export class ScheduleShiftPatternController {
  constructor(
    private scheduleShiftPatternService: ScheduleShiftPatternService,
  ) {}

  //TODO Дописать гуард (босс)
  @Post('create')
  async create(
    @Body() scheduleInput: ScheduleInputDto,
  ): Promise<ScheduleShiftPattern> {
    return this.scheduleShiftPatternService.createScheduleShiftPattern({
      User: {
        connect: {
          id: scheduleInput.guard_id,
        },
      },
      Place: {
        connect: {
          id: scheduleInput.place_id,
        },
      },
      date: scheduleInput.date,
      repeat_when: scheduleInput.repeat_when,
    });
  }
}
