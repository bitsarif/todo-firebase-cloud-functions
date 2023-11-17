import { getFirestore } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import { todoCollection } from '../constant';


export const deleteTodo = onRequest(async (request, response) => {
  const pathSegments = request.path.split('/');
  const todoId = pathSegments.pop();

  if (!todoId) {
    response.status(404).send('Not found');
    return;
  }

  await getFirestore().collection(todoCollection).doc(todoId).delete();

  response.json({ message: `Todo with id ${todoId} deleted` });
});
