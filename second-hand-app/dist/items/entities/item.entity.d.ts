import { User } from '../../users/entities/user.entity';
export declare class Item {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    city: string;
    condition: string;
    isNegotiable: boolean;
    status: string;
    views: number;
    createdAt: Date;
    user: User;
}
