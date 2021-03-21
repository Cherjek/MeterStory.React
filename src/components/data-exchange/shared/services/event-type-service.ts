import { ICallbackColumnService } from '../../../common/data-grid/icallback-service';
import { SchedulerService } from './scheduler-service';
import { MessagesOperatorService } from './messages-operator-service';
import { MeterMessagesService } from './meter-messages-service';
// import { Scheduler } from './models/scheduler';
export class EventTypeService implements ICallbackColumnService {
  schedulerService: SchedulerService;
  messagesOperatorService: MessagesOperatorService;
  meterMessagesService: MeterMessagesService;
  static schedulers: string[];
  static messages: string[];
  static dataPU: string[];
  deleteZeroValues = (v) => {
    let result = [`id: ${v.id}`]
    if (v.day) {
      result.push(`день: ${v.day}`)
    }
    if (v.hour) {
      result.push(`час: ${v.hour}`)
    }
    if (v.min) {
      result.push(`мин: ${v.min}`)
    }
    return result.join(', ')
  }
  getData(dependVal: any) {
    return new Promise<any[]>((resolve, reject) => {
      if (dependVal === 'Расписание') {
        if (EventTypeService.schedulers == null) {
          if (this.schedulerService == null) {
            this.schedulerService = new SchedulerService();
          }
          this.schedulerService
              .getData()
              .then(result => {
                EventTypeService.schedulers = ['', ...result?.map(v => this.deleteZeroValues(v))];
                resolve(EventTypeService.schedulers);
              })
        } else {
          resolve(EventTypeService.schedulers);
        }
      } else if (dependVal === 'Сообщение оператора') {
        if (EventTypeService.messages == null) {
          if (this.messagesOperatorService == null) {
            this.messagesOperatorService = new MessagesOperatorService();
          }
          this.messagesOperatorService
              .getData()
              .then(result => {
                EventTypeService.messages = ['', ...result?.map(v => `id: ${v.id}, тип: ${v.type}, сообщение: ${(v.msg || '').substring(0, 20)}...`)];
                resolve(EventTypeService.messages);
              })
        } else {
          resolve(EventTypeService.messages);
        }
      } else if (dependVal === 'Данные прибора учета') {
        if (EventTypeService.dataPU == null) {
          if (this.meterMessagesService == null) {
            this.meterMessagesService = new MeterMessagesService();
          }
          this.meterMessagesService
              .getData()
              .then(result => {
                EventTypeService.dataPU = ['', ...result?.map(v => `id: ${v.id}, тип протокола: ${v.proto}, идентификатор ПУ: ${v.MeterId}, глубина: ${v.depth}`)];
                resolve(EventTypeService.dataPU);
              })
        } else {
          resolve(EventTypeService.dataPU);
        }
      } else {
        resolve([]);
      }
    });
  }
}