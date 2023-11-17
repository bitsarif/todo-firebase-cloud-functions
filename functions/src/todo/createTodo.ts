import { getFirestore } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import { todoCollection } from '../constant';
import { CreateTodoDto } from './dto/create-todo.dto';

export const createTodo = onRequest(async (request, response) => {
  const body = request.body as CreateTodoDto;
  
  const todo = await getFirestore().collection(todoCollection).add({
    title: body.title,
    description: body.description,
    done: body.done,
  });

  const snapshot = await todo.get();
  
  response.json({ id: snapshot.id, ...snapshot.data() });
});
