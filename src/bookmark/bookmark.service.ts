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


    createBookmarksById(
        userId: number,
        dto: CreateBookmarkDto
    ) { 
        
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