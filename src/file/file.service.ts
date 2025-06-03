import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';
import { Repository } from 'typeorm';
import * as pdfParse from 'pdf-parse';
import * as fs from 'fs';
import { AiModelService } from 'src/ai_model/ai_model.service';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(Document)
        private readonly docsRepository:Repository<Document>, ) {}

    //nettoyer du texte.
    sanitizeText(input: any): string {
        if (!input) return '';
      
        const text = typeof input === 'string' ? input : String(input);
      
        return text
          .replace(/\*\*/g, '') // supprime le gras Markdown (**text**)
          .replace(/__([^_]+)__/g, '$1') // supprime souligné Markdown (__text__)
          .replace(/[_*`~]/g, '') // supprime les caractères Markdown restants
          .replace(/<[^>]*>/g, '') // supprime toutes les balises HTML
          .replace(/\r?\n|\r/g, ' ') // remplace les sauts de ligne par un espace
          .trim(); // supprime les espaces au début et à la fin
    }

    // Extraire le texte d'un PDF
    async extractPDFText(pdfBuffer: Buffer): Promise<string>{
        const data = await pdfParse(pdfBuffer);
        return data.text;
    }

    //suppression des fichiers
    async delete(filePath:string){
        fs.unlinkSync(filePath);
    }

    //sauvegarde de fichiers
    async saveFiles(docs: any){
        return this.docsRepository.save(docs);
    }

    //recupérer les fichiers d'un user
    async getAllFiles(id_user:number){
        return this.docsRepository.find({where:{Id_user:id_user}})
    }

    //recupérer un document spécifique
    async getOneDoc(id_docs:number){
        return this.docsRepository.findOne({where: {Id_docs : id_docs}})
    }

}
