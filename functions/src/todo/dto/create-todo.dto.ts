import { TodoDto } from './todo.dto';

export interface CreateTodoDto extends Omit<TodoDto, 'id'> {}
