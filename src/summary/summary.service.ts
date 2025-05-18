import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AiModelService } from 'src/ai_model/ai_model.service';
import { Resumes } from 'src/entities/resumes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SummaryService {
    constructor(
        @InjectRepository(Resumes)
        private readonly resumeRepository:Repository<Resumes>,

        private aiModel:AiModelService
    ){}
    
    async save(resume:any){
        return this.resumeRepository.save(resume)
    }

    async findOne(id:number){
        return this.resumeRepository.findOne({where: {id_resum:id}})
    }
}
