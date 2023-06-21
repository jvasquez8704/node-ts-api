import { HttpStatusCode } from './enums';

export class HttpStatusCodeError extends Error {
  status: HttpStatusCode;

  errors: string[] | Record<string, any>[] | undefined;

  constructor(status: HttpStatusCode, message: string | undefined = undefined, errors: string[] | Record<string, any>[] | undefined = undefined) {
    super(message || `Request failed with status code ${status}`);
    this.status = status;
    this.errors = errors;
  }
}
