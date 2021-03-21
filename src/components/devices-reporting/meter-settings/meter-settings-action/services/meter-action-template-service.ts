import { IFormTemplateService } from '../../../../shared/form-template/iform-template-service';
import { Utils } from '../../../../../core/utils';
import { ModelAction } from './models/model-action';
import { Fetch } from '../../../../../core/service';
import { EventTypeService } from '../../../../data-exchange/shared/services/event-type-service';
export const eventType = ['Расписание','Изменение дискретного входа'];
export const pollType = ['Срезы энергии','Срезы показателей качества сети','Показания за сутки','Показания за месяц','Показания на начало суток','Показания на начало месяца','Профили мощности','Показания на начало часа','Журналы','Синхронизация времени','Срезы аппаратной конфигурации'];
export class MeterActionTemplateService extends Fetch implements IFormTemplateService<ModelAction> {
  eventTypeService = new EventTypeService();
  constructor() {
    super('/settings/actions/meter');
  }
  getDataAction(): Promise<ModelAction[]> {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: ModelAction) => {
        sett.eventType = eventType[(sett.eventType as number)];
        sett.type = pollType[(sett.type as number)];
        return sett;
      }));
  }
  getData(): Promise<ModelAction[]> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.eventTypeService.getData('Расписание')
      ])
      .then(
          (
            result: [
              string[]
            ]
          ) => {
              this
              .getDataAction()
              .then((resultAction: ModelAction[]) => {
                resultAction?.map((sett: ModelAction) => {
                    if (sett.eventType === 'Расписание') {
                      sett.eventId = result[0].find((x: string) => Utils.compareId(x, sett.eventId as string));
                    } 
                    return sett;
                });
                resolve(resultAction);
              })
              .catch(error => reject(error));
          }
        )
        .catch(error => reject(error));
    });
  }
  saveData(data: ModelAction[]): Promise<Response> {
    return super.save(
      {
        Settings: data.map((sett: ModelAction) => {
                      sett = {...sett};
                      if (sett.eventType) {
                        sett.eventType = eventType.findIndex((v: string) => v === (sett.eventType as string));
                        sett.eventType = sett.eventType === -1 ? 0 : sett.eventType;
                      }
                      if (sett.eventId) sett.eventId = Utils.parseId(sett.eventId as string);
                      sett.type = pollType.findIndex((v: string) => v === (sett.type as string));
                      sett.type = sett.type === -1 ? 0 : sett.type;
                      return sett;
                  })
    });
  }
  clearData(): Promise<Response> {
    return super.clear();
  }
}