import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';
import { QuestionReponse } from 'src/entities/question_response.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs'
import { FileService } from 'src/file/file.service';
import { Resumes } from 'src/entities/resumes.entity';
import { AiModelService } from '../ai_model/ai_model.service';
import * as path from 'path';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository:Repository<Quiz>,
        @InjectRepository(Document)
        private docRepository:Repository<Document>,
        @InjectRepository(QuestionReponse)
        private qrRepository:Repository<QuestionReponse>,
         @InjectRepository(Resumes)
        private resumeRepository:Repository<Resumes>,

        private fileService:FileService,
        private aiService: AiModelService,
    ){}

    async createQuiz(quiz:any){
        return this.quizRepository.save(quiz)
    }

    //recupérer les informations du document choisi et du resumé associer
    async prepareQuiz(id_docs:number, id_user:number){

        //recupérer le path du document la base de donnée
        const find_doc= await this.docRepository.findOne({where: {Id_docs:id_docs}});
        const path_doc = find_doc.path;

        //recupérer le resumé associer
        const resume = await this.resumeRepository.findOne({where:{Id_docs:id_docs}});
        const id_resume=resume.id_resum;

        //lire le document et extraire le  texte
        const pdfBuffer = fs.readFileSync(path_doc);
        const extractedText = await this.fileService.extractPDFText(pdfBuffer);

        //enregistrer quiz
        const quiz={Id_user:id_user, Id_resum:id_resume};
        const saved_quiz=await this.createQuiz(quiz);

        //Generate quiz
        const generated_quiz= await this.aiService.GenerateQuizJson(extractedText);
        
        //stocker dans un dossier

        // Définition du chemin du dossier et du fichier JSON
        const documentsDir = path.join(process.cwd(), 'quizzes');
        const jsonPath = path.join(documentsDir, resume.libelle+'_quiz.json');
        const path_json = ("quizzes/"+resume.libelle+'_quiz.json');

        // Vérifier et créer le dossier 'documents' si nécessaire
        if (!fs.existsSync(documentsDir)) {
            try {
            fs.mkdirSync(documentsDir, { recursive: true });
            console.log('Dossier créé avec succès.');
            } catch (error) {
            throw new Error(`Erreur lors de la création du dossier "documents": ${error.message}`);
            }
        }

        // Écriture des questions dans le fichier JSON
        try {
            const jsonData = JSON.stringify(generated_quiz, null, 2);
            fs.writeFileSync(jsonPath, jsonData, 'utf8');
            console.log(`Fichier JSON sauvegardé dans : ${jsonPath}`);
        } catch (error) {
            throw new Error(`Erreur lors de l'écriture du fichier JSON: ${error.message}`);
        }

        //enregistrer quiz (question_reponse généré)
        const question_reponse_dto={path_json:path_json, Id_quiz:saved_quiz.Id_quiz}
        await this.qrRepository.save(question_reponse_dto)
    }
}
