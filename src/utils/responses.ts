import { Response } from 'express';
import { FailedResponse, SuccessResponse } from './classes/Response';

interface ISuccess {
  res: Response;
  data: any | null;
  code?: number;
  message?: string | null;
}

interface IFailure {
  res: Response;
  message: string;
  code: number | null;
  exception: unknown | null;
}

const success = async ({
  res,
  data = null,
  code = 200,
  message = null,
}: ISuccess): Promise<Response<SuccessResponse>> => {
  const _response: SuccessResponse = new SuccessResponse({
    error: false,
    data: data ?? null,
    statusCode: code,
    message: message,
  });
  
  const { statusCode, ..._responseWithoutSC } = _response;
  
  return res.status(statusCode).json(_responseWithoutSC);
};

const failed = async ({
  res,
  message,
  code = 400,
  exception = null,
}: IFailure): Promise<Response<FailedResponse>> => {
  let _message = message

  if (exception instanceof Error) {
    _message = exception.message
} 
  const _response: FailedResponse = new FailedResponse({
    message: _message,
    statusCode: code,
    exception: exception,
  });

  const {statusCode, ..._responseWithoutSC} = _response

  return res.status(statusCode).json(_responseWithoutSC);
};

export { success, failed };
