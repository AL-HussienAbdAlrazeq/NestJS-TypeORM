import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsOptional } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
    @IsOptional()
    name?: string;
 
    @IsOptional()
    public?: boolean;

    comments?: CreateCommentDto[];
}
