import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Book } from 'src/infrastructure/adapters/respository/books/schema/book.schema';
import { BookService } from 'src/domain/services/book/book.service';
import { CreateBookDTO } from 'src/application/dtos/create-book.dto';
import { UpdateBookDTO } from 'src/application/dtos/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
    constructor(private bookModel: BookService){}

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]>{
        return this.bookModel.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createBook(
        @Body()
        book: CreateBookDTO,
        @Req() req
    ): Promise<Book>{

        return this.bookModel.create(book, req.user);
    }

    @Get(':id')
    async getBook(
        @Param('id')
        id: string
    ): Promise<Book>{
        return this.bookModel.findByID(id);
    }

    @Put(':id')
    async updateBook(
        @Param('id')
        id: string,
        @Body()
        book: UpdateBookDTO
    ): Promise<Book>{
        return this.bookModel.updateByID(id, book);
    }

    @Delete(':id')
    async deleteBook(
        @Param('id')
        id: string
    ): Promise<Book>{
        return this.bookModel.deleteByID(id);
    }
}
