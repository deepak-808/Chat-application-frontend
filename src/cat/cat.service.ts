import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatService {
  private users = [
    {
      id: 1,
      name: 'Deepak',
      email: 'deepak@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'John',
      email: 'john@gmail.com',
      role: 'USER',
    },
    {
      id: 3,
      name: 'Sarah',
      email: 'sarah@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Michael',
      email: 'michael@gmail.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Emily',
      email: 'emily@gmail.com',
      role: 'USER',
    },
    {
      id: 6,
      name: 'David',
      email: 'david@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 7,
      name: 'Jessica',
      email: 'jessica@gmail.com',
      role: 'INTERN',
    },
    {
      id: 8,
      name: 'Daniel',
      email: 'daniel@gmail.com',
      role: 'USER',
    },
    {
      id: 9,
      name: 'Jennifer',
      email: 'jennifer@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 10,
      name: 'Christopher',
      email: 'christopher@gmail.com',
      role: 'INTERN',
    },
  ];
  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER' | 'USER') {
    if (role) {
      const roleFilter = this.users.filter((user) => user.role === role);
      if (roleFilter.length > 0) return roleFilter;
      else throw new NotFoundException('User not found');
    }
    const AllUser = this.users;
    if (!AllUser) throw new NotFoundException('Users not found');
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(createCatDto: CreateCatDto) {
    const GetLastId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: GetLastId[0].id + 1,
      ...createCatDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateOne(id: number, updateCatDto: UpdateCatDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('User not Found');
    Object.assign(this.users[index], updateCatDto);
    return this.users[index];
  }

  findOneDelete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
