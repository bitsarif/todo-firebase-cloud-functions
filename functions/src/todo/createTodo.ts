import { getFirestore } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import { todoCollection } from '../constant';
import { z } from 'zod';
import { createTodoValidator } from './validators/createTodoValidator';

export const createTodo = onRequest(async (request, response) => {
  try {
    const body = createTodoValidator.parse(request.body);

    const todo = await getFirestore().collection(todoCollection).add(body);

    const snapshot = await todo.get();

    response.json({ id: snapshot.id, ...snapshot.data() });
  } catch (error) {
    if (error instanceof z.ZodError) {
      response.status(400).json({ message: error.issues });
    } else {
      response.status(500).json({ message: error });
    }
  }
});
