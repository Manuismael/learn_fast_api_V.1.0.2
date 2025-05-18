import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
@Injectable()
export class AiModelService {

    private gemini: GoogleGenerativeAI

    constructor() {
        this.gemini = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); 
    }


    // Résumer le texte avec Gemini
    async summarizeText(text: string): Promise<any> {
      try {
          const model= this.gemini.getGenerativeModel({model:"gemini-2.0-flash"});
          const prompt = `
            Analyse et traite ce document comme un assistant IA pour l'apprentissage universitaire. 
            Objectif :
            - Résume précisément et fidèlement le document, de façon concise, structurée et sans changer le sens.
            - Ne commence pas par une formule d'introduction (ex: "Voici un résumé..."), va directement au contenu.
            - Génère ensuite une fiche de révision claire et pratique :
              * Notions et concepts clés et explications
              * Dates, auteurs, titres ou événements importants si présents
              * Citations, formules ou définitions importantes à mémoriser
              * Explications suplémentaires
            - Termine par une phrase de conclusion simple qui synthétise l'apport du document pour l'étudiant.

            Langage : clair, pédagogique, sans lourdeur ni redondance.

            Document :
            ${text}
            `;

          const result = await model.generateContent(prompt);
          console.log(result.response.text());
          return result;
      } catch (error) {
          console.error('Error during summarization:', error);
          throw new Error('Unable to summarize the text. Please try again later.');
      }
    }

    //Genérer les quiz avec gemini
    async GenerateQuizJson(text: string): Promise<any> {
        try {
          const model = this.gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
      
          const prompt =
            "Génère un QCM en format JSON basé sur le texte suivant permettant d'évaluer un étudiant, avec cette structure : " +
            "{ question: [ { questionText: '', options: [ { text: '', correct: true }, { text: '' }, { text: '' }, { text: '' } ], explanation: '' } ] } " +
            "Le nombre de questions sera en fonction des notions abordés Utilise le texte suivant pour les questions et réponses : " + text;
      
          const result = await model.generateContent(prompt);
          const rawText = await result.response.text();
      
          //Extraire le bloc ```json ... ```
          const jsonBlockMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/);
          if (!jsonBlockMatch || !jsonBlockMatch[1]) {
            throw new Error("Bloc JSON introuvable dans la réponse.");
          }
      
          const jsonContent = jsonBlockMatch[1]; // Le contenu JSON sans les balises ```json
          const parsedJson = JSON.parse(jsonContent); // On le transforme en objet JS
          return parsedJson;
      
        } catch (error) {
          console.error('Erreur lors de la génération du QCM :', error);
          throw new Error('Impossible de générer le QCM. Veuillez réessayer plus tard.');
        }
    }

    async GenerateFlashcardJson(text: string): Promise<any> {
        try {
          const model = this.gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
      
          const prompt = 
          "Génère des flashcards Vrai/Faux en format JSON basé sur le texte suivant permettant d'évaluer un étudiant, avec cette structure : " +
          "{ flashcards: [ { statement: '', isTrue: true, explanation: '' } ] } " +
          "Le nombre d'affirmations sera en fonction des notions abordées. Utilise uniquement le texte suivant pour les affirmations, les réponses et les explications : " + text;

          const result = await model.generateContent(prompt);
          const rawText = await result.response.text();
      
          //Extraire le bloc ```json ... ```
          const jsonBlockMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/);
          if (!jsonBlockMatch || !jsonBlockMatch[1]) {
            throw new Error("Bloc JSON introuvable dans la réponse.");
          }
      
          const jsonContent = jsonBlockMatch[1]; // Le contenu JSON sans les balises ```json
          const parsedJson = JSON.parse(jsonContent); // On le transforme en objet JS
          return parsedJson;
      
        } catch (error) {
          console.error('Erreur lors de la génération du flashcard :', error);
          throw new Error('Impossible de générer le flashcard. Veuillez réessayer plus tard.');
        }
    }

    //Titre des historiques de chaque resumé
    async historyName(text:string){
      try {
        const model= this.gemini.getGenerativeModel({model:"gemini-2.0-flash"});
        const prompt = `
          - Ne commence pas par une formule d'introduction (ex: "Voici un titre...").
          - Génère un titre court à ce document
          Langage : clair, pédagogique, sans lourdeur ni redondance.
          Document :
          ${text}
          `;

        const titre = await model.generateContent(prompt);
        console.log(titre.response.text());
        return titre;
        } catch (error) {
            console.error('Error during summarization:', error);
            throw new Error('Unable to generate the history title. Please try again later.');
        }
    }


    async fileName(text:string){
        try {
          const model= this.gemini.getGenerativeModel({model:"gemini-2.0-flash"});
          const prompt = `
            - Ne commence pas par une formule d'introduction (ex: "Voici un titre...").
            - Donne un nom court à ce document
            
            Document :
            ${text}
            `;
  
          const titre = await model.generateContent(prompt);
          return titre;
          } catch (error) {
              console.error('Error during summarization:', error);
              throw new Error('Unable to generate the file name. Please try again later.');
          }
      }
}
