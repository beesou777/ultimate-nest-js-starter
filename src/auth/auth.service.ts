import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signup(dto: AuthDto): Promise<User> {
        try {
            // generate password has
            const hash = await argon.hash(String(dto.password));
            const user = await this.prisma.user.create({
                data: {
                    email: String(dto.email),
                    hash,
                }
            })
            delete user.hash
            // save new user in db
            
            // return the save user
            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }

    async login(dto: AuthDto): Promise<any> {
        try {
            const user = this.prisma.user.findUnique({
                where: {
                    email: String(dto.email)
                }
            })

            if (!user) {
                throw new ForbiddenException('Credentials incorrect')
            }

            const pwMatches = await argon.verify(
                (await user).hash,
                String(dto.password)
            )

            if (!pwMatches) {
                throw new ForbiddenException('Credentials incorrect')
            }
            return this.signToken((await user).id, (await user).email)
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials unmatched')
                }
            }
            throw error
        }
    }

    async signToken(
        userId: number,
        email: String
    ): Promise<{access_token:string}> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: secret
            })

        return {
            access_token: token
        }

    }
}