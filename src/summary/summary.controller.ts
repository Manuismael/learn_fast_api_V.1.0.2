import { Controller, Get, Param } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
    constructor(private summaryService: SummaryService){}

    @Get('findsummary/:id_user')
    findAllResumeByUser(@Param('id_user')id_user:number){
        return this.summaryService.findAll(id_user)
    }
}
