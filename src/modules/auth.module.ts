import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/user/repository/user.entity';
import { JwtAccessStrategy } from 'src/middleware/auth/strategy/auth.access.strategy';
import { JwtRefreshStrategy } from 'src/middleware/auth/strategy/auth.refresh.strategy';
import { UserRepository } from 'src/domain/user/repository/user.repository';

@Module({
    imports: [PassportModule, JwtModule, TypeOrmModule.forFeature([UserEntity])],
    controllers: [],
    providers: [JwtAccessStrategy, JwtRefreshStrategy, UserRepository],
    exports: [JwtModule, JwtAccessStrategy, JwtRefreshStrategy]
})
export class AuthModule {}
