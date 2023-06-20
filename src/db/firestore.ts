import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import IDB from './idb';
import path from 'path';
import Constants from '../utils/constants';
class FirestoreDB implements IDB<any> {
  private instance: any;
  constructor() {
    const serviceAccount = path.join(__dirname, Constants.ServiceAccountFilePath);
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