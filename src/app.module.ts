import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './providers/database/prisma/prisma/prisma.module';
import { PrismaService } from './providers/database/prisma/prisma/prisma.service';
import { IsEmailNotExistConstraint } from './common/validations/email.not.exists.validation';
import { IsEmailExistConstraint } from './common/validations/email.exists.validation';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './common/guards/jwt/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({ secret: process.env.JWT_SECRET, global: true }),
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    IsEmailNotExistConstraint,
    IsEmailExistConstraint,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
