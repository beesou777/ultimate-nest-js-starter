import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@Controller('bookmark')
export class BookmarkController {
    @Get()
    getBookmarks(
        @GetUser('id') userId: number,
    ) { }

    @Get(':id')
    getBookmarksById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ) { }

    @Post()
    updateBookmarksById(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto
    ) { }

    @Patch()
    editBookmarksById(
        @GetUser('id') userId: number,
        @Body() dto: EditBookmarkDto
    ) { }

    @Delete(':id')
    deleteBookmarksById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number

    ) { }

}
