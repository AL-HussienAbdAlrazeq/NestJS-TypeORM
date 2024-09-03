import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateListingDto } from './create-listing.dto';
import { CreateCommentDto } from './create-comment.dto';
import { CreateTagDto } from './create-tag.dto';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  public: boolean;

  @IsNotEmpty()
  listing: CreateListingDto;

  comments: CreateCommentDto[];

  @IsNotEmpty()
  tags: CreateTagDto[];
}
