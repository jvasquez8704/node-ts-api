import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import IDB from './idb';
import path from 'path';
class FirestoreDB implements IDB<any> {
  private instance: any;
  constructor() {
    const serviceAccount = path.join(__dirname, 'credentials/atom-test-2cf92-firebase-adminsdk-qkff5-f595bd8f87.json');
    initializeApp({
      credential: cert(serviceAccount),
    });
    this.instance = getFirestore();
  }
  getDB() {
     return this.instance
  }
}

export default FirestoreDB;