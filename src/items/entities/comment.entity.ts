import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  @ManyToOne(() => Item, (item) => item.comments)
  item: Item;
  constructor(comments: Partial<Comment>) {
    Object.assign(this, comments);
  }
}
