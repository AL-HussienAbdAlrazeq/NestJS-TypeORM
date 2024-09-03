import { IsBoolean, IsNotEmpty, IsString } from "class-validator"


export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    content:string
}
