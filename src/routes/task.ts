import { Router } from "express"
import Container from 'typedi';
import TaskController from "../controller/task";
import { check } from 'express-validator'
import validateRules, { validateStatus } from "../middlewares/task.validators";

const taskRoutes = Router();
const taskController = Container.get(TaskController)

taskRoutes.get('/', taskController.getTasks)

taskRoutes.get('/:id', taskController.getTask)

taskRoutes.post('/', [
    check('title', 'La propiedad title es requerida para crear una tarea correctamente').not().isEmpty(),
    check('description', 'La propiedad description es requerida para crear una tarea correctamente').not().isEmpty(),
    check('status').custom(validateStatus),
    validateRules
], taskController.addTask)

taskRoutes.put('/:id', [
    check('status').custom(validateStatus),
    validateRules
   ], taskController.updateTask)

taskRoutes.delete('/:id', taskController.deleteTask)



export default taskRoutes;