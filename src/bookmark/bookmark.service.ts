import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@Injectable()
export class BookmarkService {
    getBookmarks(
        userId: number
    ) { }

    getBookmarksById(
        userId: number,
        bookmarkId: number
    ) { }


    createBookmarksById(
        userId: number,
        dto: CreateBookmarkDto
    ) { }


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
