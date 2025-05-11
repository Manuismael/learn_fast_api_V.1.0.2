import { Controller, Post,UploadedFile,UseInterceptors,BadRequestException, Param, Get, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import * as path from 'path';
import 'multer';
import * as fs from 'fs'
import { AiModelService } from 'src/ai_model/ai_model.service';
import { SummaryService } from 'src/summary/summary.service';

@Controller('file')
export class FileController {

    constructor(private readonly fileService: FileService, private aiService:AiModelService, private summaryService:SummaryService) {}
    private filePath:any;
    @Post('upload/:id_user')
    @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + path.extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only PDF or DOCX files are allowed'), false);
        }
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File,@Param('id_user') id: number,){
    this.filePath = file.path;
    let extractedText = '';

    try {
      if (file.mimetype === 'application/pdf') {
        const pdfBuffer = fs.readFileSync(this.filePath);
        extractedText = await this.fileService.extractPDFText(pdfBuffer);

        const filename= await this.aiService.fileName(extractedText);
        const newName= this.fileService.sanitizeText(filename.response.candidates[0].content.parts[0].text);
        
        //rename file
        const extension = path.extname(file.originalname);
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        const finalFilename = `${newName}-${timestamp}${extension}`;
        const newPath = path.join(path.dirname(this.filePath), finalFilename);

        fs.renameSync(this.filePath, newPath);
        this.filePath = newPath;

        //resumé (generation de libelle et enregistrement du resumé dans la bdd)
        const generate_libelle=await this.aiService.historyName(extractedText);
        const libelle = this.fileService.sanitizeText(generate_libelle.response.candidates[0].content.parts[0].text);

        const generate_summary= await this.aiService.summarizeText(extractedText);
        const summary= this.fileService.sanitizeText(generate_summary.response.candidates[0].content.parts[0].text);

        const saved_file= await this.fileService.saveFiles({path:this.filePath, Id_user:id});
        
        if(saved_file.Id_docs){
          await this.summaryService.save({libelle: libelle, content:summary, Id_docs:saved_file.Id_docs})
        }
        
        
      }

    } finally {
      // je verrai quoi mettre aprèèèèèèèèèèèèèèès
      
    }
  };

  @Get('saved_files') //afficher tout les documents téléverser
  getFiles(){
    return this.fileService.getAllFiles();
  }
}
