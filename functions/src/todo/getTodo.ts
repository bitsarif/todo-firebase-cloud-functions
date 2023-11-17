import { getFirestore } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import { todoCollection } from '../constant';

export const getTodo = onRequest(async (request, response) => {
  const pathSegments = request.path.split('/');
  const todoId = pathSegments.pop();

  if (!todoId) {
    response.status(404).send('Not found');
    return;
  }

  const todo = await getFirestore()
    .collection(todoCollection)
    .doc(todoId)
    .get();

  if (!todo.exists) {
    response.status(404).send('Not found');
    return;
  }

  response.json({ id: todo.id, ...todo.data() });
});
