export default interface ICelebrateError {
  error: string;
  message: string;
  statusCode: number;
  validation?: {
    body: {
      keys: string[];
      message: string;
      source: string;
    };
  };
}
