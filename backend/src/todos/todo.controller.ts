import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    try {
      return await this.todoService.findAll();
    } catch (error) {
      console.error('Error in TodoController findAll:', error);
      throw error;
    }
  }

  @Post()
  async create(@Body() todoData: Todo): Promise<Todo> {
    try {
      return await this.todoService.create(todoData);
    } catch (error) {
      console.error('Error in TodoController create:', error);
      throw error;
    }
  }
}

