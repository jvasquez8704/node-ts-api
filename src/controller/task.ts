import { Request, Response } from "express";
import get from 'lodash/get';
import TaskFirebaseRepo from "../repo/task.firebase";
import TaskFirestoreRepo from "../repo/task.firestore";
import TaskModel from "../models/task.model";
import IRepo from "../repo/repo";
import { DBProvider } from "../lib/enums";
import Constants from "../utils/constants";
import errorMiddleware from "../utils/errorMiddleware";


let taskRepo: IRepo<TaskModel>;
if(Constants.CloudProvider === DBProvider.FIREBASE) {
    taskRepo = new TaskFirebaseRepo();
} else {
    taskRepo = new TaskFirestoreRepo();
}

export const getTasks = async (req:Request, res: Response) => {
    try {
        const tasks  = await taskRepo.fetch({})
        res.status(200).json({data:tasks , status:'ok', message:'sucess'})
    } catch (error: any) {
        errorMiddleware(error, req, res)
    }
}

export const getTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const taskFound = await taskRepo.findOne({id})
        res.status(200).json({data: taskFound, status:'ok', message:'sucess'})
    } catch (error: any) {
        errorMiddleware(error, req, res)
    }
}

export const addTask = async (req: Request, res: Response) => {
    try {
        const [createdTask] = await taskRepo.create([get(req, 'body')] as TaskModel[])
        res.status(201).json({data: createdTask, status:'ok', message:'sucess'})
    } catch (error: any) {
        errorMiddleware(error, req, res)
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await taskRepo.detele({id})
        res.status(200).json({status:'ok', message:`the task ${id} was deleted`})
    } catch (error: any) {
        errorMiddleware(error, req, res);
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await taskRepo.update(get(req, 'body') as TaskModel, {id})
        res.status(204).json()
    } catch (error: any) {
        errorMiddleware(error, req, res);
    }
}