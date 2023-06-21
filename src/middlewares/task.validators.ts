
import { HttpStatusCode } from "../lib/enums";
import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from "express";
import { HttpStatusCodeError } from "../lib/error";
import errorMiddleware from "../utils/errorMiddleware";
import { get } from "lodash";
import Constants from "../utils/constants";
import { TaskStatus } from "../models/task.model";

export const validateStatus = async (status = '') => {
    const statusIn = Constants.TaskStatuses.includes(status as TaskStatus)
    if(status && !statusIn) {
       throw new Error(`El status debe hacer match con uno de los siguientes valores ${Constants.TaskStatuses.join(', ')}`)
    }
}

const validateRules = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new HttpStatusCodeError(HttpStatusCode.BadRequest, 'The request is not valid', get(errors, 'errors'));
        return errorMiddleware(error, req, res)
    }
    next();
}

export default validateRules;