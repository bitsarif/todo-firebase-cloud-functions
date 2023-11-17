import { TodoDto } from './todo.dto';

export interface UpdateTodoDto extends Partial<Omit<TodoDto, 'id'>> {}
