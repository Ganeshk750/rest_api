import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGurd } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1000s' }
            })
        })
    ],
    providers: [AuthService, RolesGuard, JwtAuthGurd, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }
