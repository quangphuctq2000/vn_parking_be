import { User } from '@/database/models/users';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
    private userRepository = this.dataSource.getRepository(User);
    constructor(private dataSource: DataSource) {}

    async create(user: User) {
        await this.userRepository.save(user);
    }

    async get(id: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { id },
            relations: {
                vehicle: true,
            },
        });
    }

    async getUserRole(userId: string) {}
}
