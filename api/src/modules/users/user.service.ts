import bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { CreateUserDTO, UpdateUserDTO } from './user.types';
import { AppError } from '../../utils/app-error';

export class UserService {
  private userRepository = new UserRepository();

  async create(data: CreateUserDTO) {
    const userWithSameEmail = await this.userRepository.findByEmail(data.email);

    if (userWithSameEmail) {
      throw new AppError('Ya existe un usuario registrado con ese correo', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return user;
  }

  async update(id: number, data: UpdateUserDTO) {
    await this.findById(id);

    if (data.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(data.email);

      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new AppError('Ya existe otro usuario registrado con ese correo', 400);
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.userRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.userRepository.delete(id);
  }
}