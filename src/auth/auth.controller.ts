import { Body, Controller, Post } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { signInDto } from '../DTOs/signIn.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService){}

    @Post()
    create(@Body() auth: Users): Promise<Users>{
        return this.authservice.signup(auth);
    }

    @Post('/signIn')
    signIn(@Body() signInDto:signInDto){
        return this.authservice.signin(signInDto);
    }
}
