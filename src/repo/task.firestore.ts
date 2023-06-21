import get from 'lodash/get';
import first from 'lodash/first';
import omit from 'lodash/omit';
import TaskModel from "../models/task.model";
import IRepo from "./repo";
import { v1 } from 'uuid';
import FirestoreDB from '../db/firestore';
import Constants from "../utils/constants";
import { Service } from 'typedi';
@Service()
class TaskFirestoreRepo implements IRepo<TaskModel> {
    private MODEL_NAME = Constants.Models.Tasks;
    private db: any;
    constructor() {
      const fs = new FirestoreDB();
      this.db = fs.getDB();
    }
    async findOne(filter: any): Promise<TaskModel> {
      const docRef = this.db.collection('tasks').doc(get(filter, 'id'));
      const task = await docRef.get();
      if(!task.exists) {
          throw new Error(`task with id: ${get(filter, 'id')} not found`)
      }
      return task.data() as TaskModel
    }
    async fetch(filter?: any): Promise<TaskModel[]> {
      const collectionRef = this.db.collection(this.MODEL_NAME);
      const tasks = await collectionRef.get();
      let docs: TaskModel[] = [];
      if(tasks.empty) {
          throw new Error(`no tasks found yet`)
      }
      tasks.forEach((element: any) => {
          docs.push(element.data() as TaskModel );
      });
      return docs;
    }
    async create(entries: TaskModel[]): Promise<TaskModel[]> {
        const id = v1();
        const docRef = this.db.collection(this.MODEL_NAME).doc(id);
        await docRef.set({id,...first(entries)} as any);
        return entries;
    }
    async update(entry: Partial<TaskModel>, filter: any): Promise<void> {
      const docRef = this.db.collection(this.MODEL_NAME).doc(get(filter, 'id'));
      const task = await docRef.get();
      if(!task.exists){
          throw new Error(`task with id: ${get(filter, 'id')} not found`)
      }
      const updatedTask = {
          ...task.data(),
          ...omit(entry, ['id'])
      }
      await docRef.set(updatedTask);
    }
    async detele(filter: any): Promise<void> {
        const docRef = this.db.collection(this.MODEL_NAME).doc(get(filter, 'id'));
        const doc = (await docRef.get()).data()
        await docRef.delete();
    }
}

export default TaskFirestoreRepo;