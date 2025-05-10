import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Docs } from 'src/entities/file.entity';
import { Repository } from 'typeorm';
import * as pdfParse from 'pdf-parse';
import * as fs from 'fs';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(Docs)
        private readonly docsRepository:Repository<Docs>) {}

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

}
