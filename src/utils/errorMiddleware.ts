/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request, NextFunction } from 'express';
import {
  isError, isObject, get, has
} from 'lodash';
import cleanDeep from 'clean-deep'
import { HttpStatusCodeError } from '../lib/error';
import { HttpStatusCode } from '../lib/enums';

export default (
  err: Error & HttpStatusCodeError,
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  // eslint-disable-next-line no-param-reassign
  if (!isError(err)) {
    const message = err;
    // eslint-disable-next-line no-param-reassign
    err = new HttpStatusCodeError(HttpStatusCode.BadRequest);
    // eslint-disable-next-line no-param-reassign
    err.message = message;
  }

  if (has(err, 'response')) {
    // eslint-disable-next-line no-param-reassign
    err.status = get(err, 'response.status', get(err, 'response.data.status', HttpStatusCode.ServerError));
    // eslint-disable-next-line no-param-reassign
    err.message = get(err, 'response.message', get(err, 'response.data.message', ''));
  }
  // eslint-disable-next-line no-param-reassign
  err.status = err.status || 500;
  const message: any = isError(err) ? err.message : err;
  const {
    body, params, query, headers
  } = req;
  const messageObject = isObject(message) ? message : { message };
  console.log({
    ...messageObject,
    body,
    params,
    query,
    headers,
    status: err.status
  });
  res.status(err.status).json(cleanDeep({
    status: err.status,
    message,
    errorCodes: get(err, 'errorCodes')
  }));
};
