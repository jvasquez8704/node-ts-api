import admin from 'firebase-admin';
import IDB from './idb';
import path from 'path';
import Constants from '../utils/constants';

class FirebaseDB implements IDB<typeof admin.database> {
    private instance: any;
    constructor() {
        const serviceAccount = path.join(__dirname, Constants.ServiceAccountFilePath);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: Constants.FireBaseDBUrl
          });
          
        this.instance = admin.database();
    }
    getDB() {
       return this.instance
    }
}

export default FirebaseDB;