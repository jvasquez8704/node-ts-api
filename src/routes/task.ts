import { Router } from "express"
import Container from 'typedi';
import TaskController from "../controller/task";



const taskRoutes = Router();
const taskController = Container.get(TaskController)

taskRoutes.get('/', taskController.getTasks)
taskRoutes.get('/:id', taskController.getTask)
taskRoutes.post('/', taskController.addTask)
taskRoutes.put('/:id', taskController.updateTask)
taskRoutes.delete('/:id', taskController.deleteTask)



export default taskRoutes;