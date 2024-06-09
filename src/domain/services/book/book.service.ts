import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from 'src/infrastructure/adapters/respository/books/schema/book.schema';
import { Query } from 'express-serve-static-core';
import { User } from 'src/infrastructure/adapters/respository/auth/schema/user.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) {}

    async findAll(query: Query): Promise<Book[]>{

        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage -1);
        
        const keyword = query.keyword ? {
            book_title: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {}

        const books = await this.bookModel.find( {...keyword} ).limit(resPerPage).skip(skip)
        return books;
    }

    async create(book:Book, user: User): Promise<Book>{

        const data = Object.assign(book, {user: user._id})

        const res = await this.bookModel.create(data)
        return res;
    }

    async findByID(id: string): Promise<Book>{
        const isValidID = mongoose.isValidObjectId(id);

        if(!isValidID){
            throw new BadRequestException('Invalid ID!');
        }

        const book = await this.bookModel.findById(id);

        if(!book){
            throw new NotFoundException('Book not found!');
        }

        return book;
    }

    async updateByID(id: string, book: Book): Promise<Book>{
        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        })
    }

    async deleteByID(id: string): Promise<Book>{
        return await this.bookModel.findByIdAndDelete(id)
    }
}
