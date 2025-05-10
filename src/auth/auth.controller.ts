import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/entities/auths.entity';
import { signInDto } from '../DTOs/signIn.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService){}

    @Post()
    create(@Body() auth: Auth): Promise<Auth>{
        return this.authservice.signup(auth);
    }

    @Post('/signIn')
    signIn(@Body() signInDto:signInDto){
        return this.authservice.signin(signInDto);
    }
}
