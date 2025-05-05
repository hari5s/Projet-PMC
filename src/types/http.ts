export interface Request {
  body: any;
  params: any;
  query: any;
  headers: any;
}

export interface ResponseBody {
  json: (data: any) => void;
  send: (data: any) => void;
}

export interface Response {
  status: (code: number) => ResponseBody;
}