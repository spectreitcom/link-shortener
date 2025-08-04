import { Injectable } from '@nestjs/common';
import { UserRepository } from '../application/ports/user.repository';
import { UserId } from '../domain/value-objects/user-id';
import { User } from '../domain/user';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prismaService.user.upsert({
      where: { id: user.getId().value },
      update: {
        email: user.getEmail(),
        password: user.getPassword(),
      },
      create: {
        id: user.getId().value,
        email: user.getEmail(),
        password: user.getPassword(),
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!userModel) return null;
    return new User(
      new UserId(userModel.id),
      userModel.email,
      userModel.password,
    );
  }

  async findById(id: UserId): Promise<User | null> {
    const userModel = await this.prismaService.user.findUnique({
      where: { id: id.value },
    });
    if (!userModel) return null;
    return new User(
      new UserId(userModel.id),
      userModel.email,
      userModel.password,
    );
  }
}
