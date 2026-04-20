import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  imageUrl: string; // Линк към снимката (позволяваме да е празно, ако човекът няма снимка)

  @Column()
  category: string; // Категория (напр. Електроника, Мода)

  @Column()
  city: string; // Населено място

  @Column()
  condition: string; // Състояние: 'Нов' или 'Втора употреба'

  @Column({ default: false })
  isNegotiable: boolean; // По договаряне (По подразбиране е Не/false)

  @Column({ default: 'active' })
  status: string; // Статус (По подразбиране е активна)

  @Column({ default: 0 })
  views: number; // Брой преглеждания започват от нула

  @CreateDateColumn()
  createdAt: Date;

  // Намери реда с @ManyToOne и го промени така:
// Намери реда с @ManyToOne и го промени така:
    @ManyToOne(() => User, (user) => user.items, { onDelete: 'CASCADE' })
    user: User;
}