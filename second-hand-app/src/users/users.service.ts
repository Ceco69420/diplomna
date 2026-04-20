import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
   
    // 1. Проверяваме дали вече няма регистриран човек с този имейл
    const existingUser = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException('Потребител с този имейл вече съществува!');
    }

    // 2. Криптираме паролата (10 е стандартното ниво на сложност)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.passwordPlain, saltRounds);

    // 3. Създаваме новия потребител с криптираната парола
    const newUser = this.usersRepository.create({
      email: createUserDto.email,
      passwordHash: hashedPassword,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phone: createUserDto.phone,
    });

    // 4. Запазваме го в базата
    const savedUser = await this.usersRepository.save(newUser);

    // 5. Връщаме данните на потребителя, НО махаме паролата от отговора за сигурност
    const { passwordHash, ...result } = savedUser;
    return result;
  }
    async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
    

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}