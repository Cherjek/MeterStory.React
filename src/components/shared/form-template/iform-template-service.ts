export interface IFormTemplateService<T> {
  getData(): Promise<T[]>;
  saveData(data: T[]): Promise<Response>;
  deleteData?(data: T): Promise<Response>;
  clearData(): Promise<Response>;
}