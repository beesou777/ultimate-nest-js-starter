import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookmarkDto{
    @IsString()
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    @IsOptional()
    description?:string

    @IsString()
    @IsNotEmpty()
    link:string;

}