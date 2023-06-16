import { Request, Response } from "express";
import db from "../db/firestore";
import { v1 } from 'uuid'
import get from 'lodash/get';



export const getTasks = async (req:Request, res: Response) => {
    try {
        const collectionRef = db.collection('tasks');
        const tasks = await collectionRef.get();
        let docs: any[] = [];
        if(tasks.empty) {
            throw new Error(`no tasks found yet`)
        }
        tasks.forEach(element => {
            docs.push(element.data());
        });
        res.status(200).json({data:docs , status:'ok', message:'sucess'})
    } catch (error: any) {
        res.status(500).json({error: get(error, 'message'), status:'fail', message:'getting error on create task'})
    }
}

export const getTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const docRef = db.collection('tasks').doc(id);
        const task = await docRef.get();
        if(!task.exists){
            throw new Error(`task with id: ${id} not found`)
        }
        res.status(200).json({data: task.data(), status:'ok', message:'sucess'})
    } catch (error: any) {
        res.status(500).json({error: get(error, 'message'), status:'fail', message:'getting error on create task'})
    }
}

export const addTask = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const id = v1();
        const docRef = db.collection('tasks').doc(id);

        await docRef.set(data);
        res.status(201).json({data: {id, data}, status:'ok', message:'sucess'})
    } catch (error) {
        res.status(500).json({error: get(error, 'message'), status:'fail', message:'getting error on create task'})
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const docRef = db.collection('tasks').doc(id);
        const doc = (await docRef.get()).data()
        await docRef.delete();
        res.status(200).json({data: doc, status:'ok', message:`the task ${id} was deleted`})
    } catch (error) {
        res.status(500).json({error: get(error, 'message'), status:'fail', message:'getting error on create task'})
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const docRef = db.collection('tasks').doc(id);
        const task = await docRef.get();
        if(!task.exists){
            throw new Error(`task with id: ${id} not found`)
        }
        const updatedTask = {
            ...task.data(),
            ...get(req, 'body')
        }
        await docRef.set(updatedTask);
        res.status(200).json({data: updatedTask, status:'ok', message:`the task ${id} was deleted`})
    } catch (error) {
        res.status(500).json({error: get(error, 'message'), status:'fail', message:'getting error on create task'})
    }
}