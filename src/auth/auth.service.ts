import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; 
import { signInDto } from '../DTOs/signIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly authRepository: Repository<Users>,
        private jwtService: JwtService
    ){}

    // Vérifier si l'email est unique
    async verifyEmailIsUnique(email: string): Promise<void> {
        const Auth = await this.authRepository.findOne({ where: { email } });
        if (Auth) {
            throw new ConflictException('Email déjà utilisé.');
        }
    }

    // Inscription des utilisateurs
    async signup(auth: Users): Promise<Users> {
        // Vérification si l'email est unique avant inscription
        await this.verifyEmailIsUnique(auth.email);

        // Hash du mot de passe avant sauvegarde
        const salt = await bcrypt.genSalt();
        auth.password = await bcrypt.hash(auth.password, salt);

        return this.authRepository.save(auth);
    }

    // Connexion des utilisateurs
    async signin(signInDto: signInDto) {
        const { email, password } = signInDto;

        // Recherche de l'utilisateur par email
        const Auth = await this.authRepository.findOne({ where: { email } });

        if (!Auth) {
            return {
                message: 'Identifiants incorrects',
                error: "Unauthorized",
                statusCode: 401
            };
        }

        // Vérification du mot de passe
        const passwordValid = await bcrypt.compare(password, Auth.password);
        if (!passwordValid) {
            return {
                message: 'Identifiants incorrects',
                error: "Unauthorized",
                statusCode: 401
            };
        }

        const payload = { sub: Auth.id, email: Auth.email };

        // Génération du token
        const token = this.jwtService.sign(payload);

        // À ce stade, l'utilisateur est authentifié
        return {
            message: 'Connexion réussie',
            token,
            AuthId: Auth.id,
            statusCode: 201
        };
    }
}
