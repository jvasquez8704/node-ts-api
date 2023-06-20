import get from 'lodash/get';
import first from 'lodash/first';
import TaskModel from "../models/task.model";
import IRepo from "./repo";
import FirebaseDB from '../db/firebase';
import Constants from "../utils/constants";
import { Service } from 'typedi';
@Service()
class TaskFirebaseRepo implements IRepo<TaskModel> {
    private MODEL_NAME = Constants.Models.Tasks;
    private db: any;
    constructor() {
      const fs = new FirebaseDB();
      this.db = fs.getDB();
    }
    async findOne(filter: any): Promise<TaskModel> {
        return new Promise<TaskModel>((resolve, reject) => {
           const dbRef = this.db.ref();
           dbRef.child(this.MODEL_NAME).child(get(filter,'id')).get().then((snapshot: any) => {
            if (snapshot.exists()) {
              resolve(snapshot.val() as TaskModel)
            } else {
              console.log("No data available");
              reject({status:404, message:'Task not found'})
            }
          }).catch((error:any) => {
            console.error(error);
            reject({status:500, message: get(error, 'message')})
          });
        })
    }
    async fetch(filter: any): Promise<TaskModel[]> {
      console.log('fetch: ', filter);
      return new Promise<TaskModel[]>((resolve, reject) => {
        const dbRef = this.db.ref();
        let docs: TaskModel[] = [];
        dbRef.child(this.MODEL_NAME).get().then((snapshot: any) => {
         if (snapshot.exists()) {
          docs.push(snapshot.val() as TaskModel)
         } 
         resolve(docs)
       }).catch((error: any) => {
         console.error(error);
         reject({status:500, message: get(error, 'message')})
       });
     })
    }
    async create(entries: TaskModel[]): Promise<TaskModel[]> {
        const dbRef = this.db.ref(this.MODEL_NAME);
        await dbRef.push(first(entries));
        return [first(entries)] as TaskModel[]
    }
    async update(entry: TaskModel, filter: any): Promise<void> {
      const dbRef = this.db.ref();
      const taskRef = dbRef.child(this.MODEL_NAME).child(get(filter,'id'))
      const foundTask = await this.findOne({id: get(filter,'id')})
      taskRef.update({
        ...foundTask,
        ...entry
      });
    }
    async detele(filter: any): Promise<void> {
      await this.db.ref(`${this.MODEL_NAME}/${<string>get(filter, 'id','')}`).remove();
    }
}


export default TaskFirebaseRepo;