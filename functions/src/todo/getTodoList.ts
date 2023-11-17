import { getFirestore } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import { todoCollection } from '../constant';

export const getTodoList = onRequest(async (request, response) => {
  const snapshot = await getFirestore().collection(todoCollection).get();
  const todoList = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  response.json(todoList);
});
