import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
export declare class ItemsService {
    private itemsRepository;
    constructor(itemsRepository: Repository<Item>);
    create(createItemDto: CreateItemDto, userId: number): Promise<Item>;
    findAll(): Promise<Item[]>;
    findOne(id: number): Promise<Item | null>;
    update(id: number, updateItemDto: UpdateItemDto): string;
    remove(id: number): Promise<{
        message: string;
    }>;
}
