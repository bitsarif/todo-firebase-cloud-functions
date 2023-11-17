import { getFirestore } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { todoCollection } from '../constant';
import { updateTodoValidator } from './validators/updateTodoValidator';

export const updateTodo = onRequest(async (request, response) => {
  try {
    const pathSegments = request.path.split('/');
    const todoId = pathSegments.pop();

    if (!todoId) {
      response.status(404).send('Not found');
      return;
    }

    const body = updateTodoValidator.parse(request.body);

    const todoDoc = getFirestore().collection(todoCollection).doc(todoId);

    await todoDoc.update(body);

    response.json({ id: todoDoc.id, ...(await todoDoc.get()).data() });
  } catch (error) {
    if (error instanceof z.ZodError) {
      response.status(400).json({ message: error.issues });
    } else {
      response.status(500).json({ message: error });
    }
  }
});
