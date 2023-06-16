import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = '/Users/jacobovasquez/javz/test/api-ts-from-scratch/atom-test-2cf92-firebase-adminsdk-qkff5-f595bd8f87.json';

initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

export default db;