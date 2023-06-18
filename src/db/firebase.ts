import admin from 'firebase-admin';
import IDB from './idb';

class FirebaseDB implements IDB<typeof admin.database> {
    private instance: any;
    constructor() {
        const serviceAccount = '/Users/jacobovasquez/javz/test/api-ts-firebase/atom-lost-firebase-adminsdk-dg3tm-8ce5ff0a4d.json';
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
// const serviceAccount = '/Users/jacobovasquez/javz/test/api-ts-firebase/atom-lost-firebase-adminsdk-dg3tm-8ce5ff0a4d.json';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://atom-lost-default-rtdb.firebaseio.com"
// }, 'atom-lost');

// const database = admin.database();

export default FirebaseDB;