import { Router } from "express"
import { addTask, deleteTask, getTask , getTasks, updateTask } from "../controller/task";



const taskRoutes = Router();

taskRoutes.get('/', getTasks)
taskRoutes.get('/:id', getTask)
taskRoutes.post('/', addTask)
taskRoutes.put('/:id', updateTask)
taskRoutes.delete('/:id', deleteTask)





export default taskRoutes;