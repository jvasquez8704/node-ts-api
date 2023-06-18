import admin from 'firebase-admin';
import IDB from './idb';
import path from 'path';

class FirebaseDB implements IDB<typeof admin.database> {
    private instance: any;
    constructor() {
        const serviceAccount = path.join(__dirname, 'credentials/atom-lost-firebase-adminsdk-dg3tm-8ce5ff0a4d.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://atom-lost-default-rtdb.firebaseio.com"
          });
          
        this.instance = admin.database();
    }
    getDB() {
       return this.instance
    }
}

export default FirebaseDB;