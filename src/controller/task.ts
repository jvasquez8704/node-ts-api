import { Request, Response } from "express";
import get from 'lodash/get';
import TaskFirebaseRepo from "../repo/task.firebase";
import TaskModel, { TaskStatus } from "../models/task.model";
import errorMiddleware from "../utils/errorMiddleware";
import { Inject, Service } from "typedi";
import { HttpStatusCode } from "../lib/enums";


@Service()
class TaskController {
    @Inject()
    private taskRepo!: TaskFirebaseRepo;

    getTasks = async (req:Request, res: Response) => {
        try {
            const tasks  = await this.taskRepo.fetch()
            res.status(HttpStatusCode.Success).json(tasks)
        } catch (error: any) {
            errorMiddleware(error, req, res)
        }
    }

    getTask = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const taskFound = await this.taskRepo.findOne({id})
            res.status(HttpStatusCode.Success).json(taskFound)
        } catch (error: any) {
            errorMiddleware(error, req, res)
        }
    }

    addTask = async (req: Request, res: Response) => {
        try {
            const { title, description, status } = get(req, 'body')
            const taskCreate: TaskModel = {
                title,
                description,
                status: status || TaskStatus.ToDo
            }
            const [createdTask] = await this.taskRepo.create([taskCreate])
            res.status(HttpStatusCode.Created).json(createdTask)
        } catch (error: any) {
            errorMiddleware(error, req, res)
        }
    }

    deleteTask = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.taskRepo.detele({id})
            res.status(HttpStatusCode.Success).json({status:'ok', message:`the task ${id} was deleted`})
        } catch (error: any) {
            errorMiddleware(error, req, res);
        }
    }

    updateTask = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { title, description, status } = get(req, 'body')
            const taskToUpdate: Partial<TaskModel> = {
                title,
                description,
                status
            }
            await this.taskRepo.update(taskToUpdate, {id})
            res.status(HttpStatusCode.NoContent).json()
        } catch (error: any) {
            errorMiddleware(error, req, res);
        }
    }

}

export default TaskController;