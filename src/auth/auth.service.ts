import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; 
import { signInDto } from '../DTOs/signIn.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly authRepository: Repository<Users>,  // Renommé en AuthRepository
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
            throw new UnauthorizedException('Identifiants incorrects.');
        }

        // Vérification du mot de passe
        const passwordValid = await bcrypt.compare(password, Auth.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Identifiants incorrects.');
        }

        // À ce stade, l'utilisateur est authentifié, et on peut générer un token JWT si nécessaire
        return {
            message: 'Connexion réussie',
            AuthId: Auth.id,
        };
    }
}
