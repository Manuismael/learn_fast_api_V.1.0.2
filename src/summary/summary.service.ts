import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Historic } from 'src/entities/historic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SummaryService {
    constructor(
        @InjectRepository(Historic)
        private readonly resumeRepository:Repository<Historic>
    ){}

    async save(resume:any){
        return this.resumeRepository.save(resume)
    }

    async findOne(id:number){
        return this.resumeRepository.findOne({where: {id:id}})
    }
}
