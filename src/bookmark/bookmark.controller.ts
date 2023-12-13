import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@Controller('bookmark')
export class BookmarkController {
    @Get()
    getBookmarks(
        @GetUser('id') userId: number,
    ) { 
        return this.getBookmarks(userId)
    }


    @Get(':id')
    getBookmarksById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ) {
        return this.getBookmarksById(userId,bookmarkId)
     }

    @Post()
    createBookmarksById(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto
    ) { 
        return this.createBookmarksById(userId,dto)
    }

    @Patch(':id')
    editBookmarksById(
        @GetUser('id') userId: number,
        @Body() dto: EditBookmarkDto,
        @Param('id', ParseIntPipe) bookmarkId: number
    ) { 
        return this.editBookmarksById(userId,dto,bookmarkId)
    }

    @Delete(':id')
    deleteBookmarksById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number

    ) {
        return  this.deleteBookmarksById(userId,bookmarkId)
    }

}
