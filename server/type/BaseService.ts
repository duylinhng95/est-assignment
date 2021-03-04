export interface ReturnService {
  status: boolean,
  message: string;
  data: object | object[];
  code?: number;
}
