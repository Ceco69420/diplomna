import { ItemsService } from './items.service';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(createItemDto: any, req: any, file: any): Promise<import("./entities/item.entity").Item>;
    findAll(): Promise<import("./entities/item.entity").Item[]>;
    findOne(id: string): Promise<import("./entities/item.entity").Item | null>;
    update(id: string, updateItemDto: UpdateItemDto): string;
    remove(id: string): Promise<{
        message: string;
    }>;
}
