export interface ICallbackColumnService {
  getData(dependVal: any): Promise<any[]>;
}