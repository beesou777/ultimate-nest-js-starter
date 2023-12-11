import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto):Promise<User> {
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
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                throw new ForbiddenException('Credentials taken')
            }
        }
        throw error
       }
    }

    login() {
        return { msg: "hello this is sign in" }
    }
}