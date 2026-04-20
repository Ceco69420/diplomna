import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto, userId: number) {
    const newItem = this.itemsRepository.create({
      ...createItemDto,
      user: { id: userId }
    });
    return this.itemsRepository.save(newItem);
  }

  findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    const item = await this.itemsRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if (item) {
      item.views += 1;
      await this.itemsRepository.save(item);
    }

    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async remove(id: number) {
  // Използваме директно delete, което е по-бързо и по-сигурно
  const result = await this.itemsRepository.delete(id);
  
  if (result.affected === 0) {
    return { message: "Обявата не е намерена или вече е изтрита" };
  }
  
  return { message: "Обявата е изтрита успешно" };
}
}