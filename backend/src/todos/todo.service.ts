import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async create(todoData: Todo): Promise<Todo> {
    const newTodo = this.todoRepository.create(todoData);
    return await this.todoRepository.save(newTodo);
  }
}
