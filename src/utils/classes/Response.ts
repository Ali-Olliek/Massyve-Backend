import selectedConfig from '../../configs/app';

class _Response {
  public error: boolean;
  public message: string | null;
  public statusCode: number;
  constructor(response: any) {
    this.error = response.error;
    this.message = response.message;
    this.statusCode = response.statusCode;
  }
}

class SuccessResponse extends _Response {
  public data: any | null;

  constructor(successResponse: any) {
    super(successResponse);
    this.data = successResponse.data;
    this.error = false;
  }
}

class FailedResponse extends _Response {
  public exception: Error | undefined;

  constructor(failedResponse: any) {
    super(failedResponse);
    this.error = true;
    if (selectedConfig.mode !== 'production') {
      this.exception = failedResponse.exception;
    }
  }
}

export { SuccessResponse, FailedResponse };
