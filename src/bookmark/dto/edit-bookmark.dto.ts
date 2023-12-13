import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditBookmarkDto{
    @IsString()
    @IsOptional()
    title?:string;

    @IsEmpty()
    @IsOptional()
    description?:string

    @IsString()
    @IsOptional()
    link?:string;

}