import { DBProvider } from "../lib/enums";
import { TaskStatus } from "../models/task.model";
import TaskFirebaseRepo from "../repo/task.firebase";
import TaskFirestoreRepo from "../repo/task.firestore";

export default {
    DefaultPort: 3000,
    DefaultEnv: 'dev',
    CloudProvider: DBProvider.FIREBASE,
    Models: {
      Tasks: 'tasks'
    },
    FireBaseDBUrl: 'https://atom-test-2cf92-default-rtdb.firebaseio.com',
    ConfigRoutes: {
      tasks: '/api/tasks'
    },
    ServiceAccountFilePath: '/../../atom-test-2cf92-firebase-adminsdk-qkff5-f595bd8f87.json',
    ConfigRepo: {
      [DBProvider.FIREBASE]: TaskFirebaseRepo,
      [DBProvider.FIRESTORE]: TaskFirestoreRepo
    },
    TaskStatuses: [TaskStatus.ToDo, TaskStatus.InProgress, TaskStatus.Done]
  } as const;