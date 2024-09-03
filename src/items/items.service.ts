import { HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    });
    const tags = createItemDto.tags.map(
      (createTagDto) => new Tag(createTagDto),
    );
    let item = new Item({
      ...createItemDto,
      listing,
      comments: [],
      tags,
    });
    await this.entityManager.save(item);
    return { message: 'Created Successfully', item };
  }

  async findAll() {
    let items = await this.itemsRepository.find();
    if (!items) {
      throw new HttpException('Items not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Success', items };
  }

  async findOne(id: number) {
    let item = await this.itemsRepository.findOne({
      where: { id },
      relations: { listing: true, comments: true , tags:true},
    });
    if (!item) {
      throw new HttpException('Items not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Success', item };
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    // await this.itemsRepository.update(id, updateItemDto);
    // let updatedItem = await this.itemsRepository.findOne({ where: { id }});
    const item = await this.itemsRepository.findOneBy({ id });
    item.public = updateItemDto.public;
    const comment = updateItemDto.comments.map((createCommentDto) => {
      return new Comment(createCommentDto);
    });
    item.comments = comment;
    await this.entityManager.save(item);
    return { message: 'Updated Successfully', item };
  }

  async remove(id: number) {
    const deletedItem = await this.itemsRepository.delete(id);
    if (!deletedItem) {
      throw new HttpException('This payment not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Deleted Successfully', deletedItem };
  }
}
