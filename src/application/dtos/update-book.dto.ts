import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/infrastructure/adapters/respository/auth/schema/user.schema";
import { Category } from "src/infrastructure/adapters/respository/books/schema/book.schema"


export class UpdateBookDTO {

    @IsOptional()
    @IsString()
    readonly book_title: string;

    @IsOptional()
    @IsString()
    readonly book_description: string;

    @IsOptional()
    @IsString()
    readonly book_author: string;

    @IsOptional()
    @IsNumber()
    readonly book_price: number;

    @IsOptional()
    @IsEnum(Category, {message: 'Please enter a correct category'})
    readonly book_category: Category;

    @IsEmpty({message: "Yoy cannot pass user id"})
    readonly user: User;
}