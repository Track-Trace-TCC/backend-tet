import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDTO } from './dto/auth.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('admin')
    async loginAdmin(@Body() body: AuthDTO) {
        return this.authService.validateAdminUser(body);
    }

    @Post('driver')
    async loginDriver(@Body() body: AuthDTO) {
        return this.authService.validateDriverUser(body);
    }
}
