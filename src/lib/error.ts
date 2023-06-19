import { HttpStatusCode } from './enums';

export class HttpStatusCodeError extends Error {
  status: HttpStatusCode;

  errorCodes: string[] | undefined;

  constructor(status: HttpStatusCode, message: string | undefined = undefined) {
    super(message || `Request failed with status code ${status}`);
    this.status = status;
  }
}
