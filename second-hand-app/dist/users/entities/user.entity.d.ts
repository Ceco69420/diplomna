import { Item } from '../../items/entities/item.entity';
export declare class User {
    id: number;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone: string;
    createdAt: Date;
    items: Item[];
}
