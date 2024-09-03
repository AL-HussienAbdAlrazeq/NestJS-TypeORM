import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;

  constructor(tags: Partial<Tag>) {
    Object.assign(this, tags);
  }
}
