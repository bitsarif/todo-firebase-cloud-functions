import { getFirestore } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import { todoCollection } from '../constant';
import { UpdateTodoDto } from './dto/update-todo.dto';

export const updateTodo = onRequest(async (request, response) => {
  const pathSegments = request.path.split('/');
  const todoId = pathSegments.pop();

  if (!todoId) {
    response.status(404).send('Not found');
    return;
  }

  const body = request.body as UpdateTodoDto;

  const todoDoc = getFirestore().collection(todoCollection).doc(todoId);

  await todoDoc.update({
    ...body,
  });

  response.json({ id: todoDoc.id, ...(await todoDoc.get()).data() });
});
