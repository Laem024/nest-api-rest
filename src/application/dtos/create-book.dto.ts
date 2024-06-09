import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, isEmpty } from "class-validator";
import { User } from "src/infrastructure/adapters/respository/auth/schema/user.schema";
import { Category } from "src/infrastructure/adapters/respository/books/schema/book.schema"


export class CreateBookDTO {
    @IsNotEmpty()
    @IsString()
    readonly book_title: string;

    @IsNotEmpty()
    @IsString()
    readonly book_description: string;

    @IsNotEmpty()
    @IsString()
    readonly book_author: string;

    @IsNotEmpty()
    @IsNumber()
    readonly book_price: number;

    @IsNotEmpty()
    @IsEnum(Category, {message: 'Please enter a correct category'})
    readonly book_category: Category;

    @IsEmpty({message: "Yoy cannot pass user id"})
    readonly user: User;
}