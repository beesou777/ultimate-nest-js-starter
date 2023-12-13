import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma :PrismaService){}
    getBookmarks(
        userId: number
    ) { 
        return this.prisma.bookmark.findMany({
            where:{
                userId
            }
        })
    }

    getBookmarksById(
        userId: number,
        bookmarkId: number
    ) { 
        return this.prisma.bookmark.findFirst({
            where:{
                userId
            }
        })
    }


    async createBookmarksById(
        userId: number,
        dto: CreateBookmarkDto
    ) { 
        await this.prisma.bookmark.create({
            data:{
                userId,
                ...dto
            }
        })
    }


    editBookmarksById(
        userId: number,
        dto: EditBookmarkDto,
        bookmarkId:number
    ) { } 

    deleteBookmarksById( 
        userId: number, 
        bookmarkId: null
    ) { }
}