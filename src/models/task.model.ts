export enum TaskStatus {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    Done = 'Done'
}
export default interface TaskModel {
    title: string;
    description: string;
    status: TaskStatus;
}