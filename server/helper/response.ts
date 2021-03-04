import {Response} from 'express-serve-static-core';

interface IError {
  code: number,
  message: string,
}

export interface IResponse {
  status: boolean,
  data?: object | object[] | null,
  error?: IError
}

export const success = (res: Response, data: object | object[]) => {
  const response: IResponse = {
    status: true,
    data,
  };

  return res.status(200).send(response);
}

export const error = (res: Response, errorCode: number, message: string, errorData: object | object[] | null = null) => {
  const response: IResponse = {
    status: false,
    data: errorData,
    error: {
      code: errorCode,
      message,
    }
  };

  return res.status(errorCode).send(response);
}

export const systemError = (res: Response) => {
  const response: IResponse = {
    status: false,
    error: {
      code: 500,
      message: "INTERNAL_SERVER_ERROR"
    }
  }

  res.status(500).send(response);
}
