import { Fetch } from '../../../../core/service';
import { Utils } from '../../../../core/utils';
import { SntpActionSettings } from './models/sntp-action-settings';
import { EventTypeService } from '../../../data-exchange/shared/services/event-type-service';
export const eventType = ['Расписание','Изменение дискретного входа'];

export class SntpActionSettingsService extends Fetch {
  eventTypeService = new EventTypeService();
  constructor() {
    super('/settings/actions/sntp');
  }
  getDataAction = (): Promise<SntpActionSettings[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: SntpActionSettings) => {
        sett.eventType = eventType[(sett.eventType as number)];
        return sett;
      }));
  }
  getData(): Promise<SntpActionSettings[]> {
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
              .then((resultAction: SntpActionSettings[]) => {
                resultAction?.map((sett: SntpActionSettings) => {
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
  saveData(body: SntpActionSettings[]) {
    return super.save(
      {
        Settings: body.map((sett: SntpActionSettings) => {
                      sett = {...sett};
                      if (sett.eventType) {
                        sett.eventType = eventType.findIndex((v: string) => v === (sett.eventType as string));
                        sett.eventType = sett.eventType === -1 ? 0 : sett.eventType;
                      }
                      if (sett.eventId && typeof sett.eventId === 'string') sett.eventId = Utils.parseId(sett.eventId as string);
                      else sett.eventId = null;
                      return sett;
                  })
    });
  }
  deleteData(body: SntpActionSettings) {
    return super.delete({ Settings: [{...body}] });
  }
  clearData() {
    return super.clear();
  }
}