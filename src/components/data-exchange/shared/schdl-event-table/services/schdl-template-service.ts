import { IFormTemplateService } from '../../../../shared/form-template/iform-template-service';
import { SchdlEvent } from './models/schdl-event';
import { Fetch } from '../../../../../core/service';
import { SchedulerStateService } from '../../../shared/services/scheduler-state';
import { SchedulerState } from '../../../shared/services/models/scheduler-state';
export const schdlEventTypes = ['Отключено','Каждые','Ежедневно','Ежемесячно'];
export class SchdlTemplateService extends Fetch implements IFormTemplateService<SchdlEvent> {
  constructor() {
    super('/settings/events/schdl');
  }
  getData(): Promise<SchdlEvent[]> {
    return new Promise((resolve, reject) => {
      Promise.all([
        super.get().then((res) => res.json()).then(({ Settings }) => Settings),
        new SchedulerStateService().getData()
      ])
      .then(
        (result: [
          SchdlEvent[], 
          SchedulerState[]
        ]) => {
          const merges = (result[0] || []).map((event => {
            let res = {...event};
            res.type = schdlEventTypes[(res.type as number)];
            const state = (result[1] || []).find(x => x.id === res.id);
            if (state) {
              res = {...res,...state};
            }
            return res;
          })
          );
          resolve(merges);
        }
      )
      .catch(err => reject(err));
    });
  }
  saveData(data: SchdlEvent[]): Promise<Response> {
    return super.save(
      {
        Settings: data.map((sett: SchdlEvent) => {
                      sett = {...sett};
                      delete sett.delay;
                      sett.type = schdlEventTypes.findIndex((v: string) => v === (sett.type as string));
                      sett.type = sett.type === -1 ? 0 : sett.type;
                      return sett;
                  })
    });
  }
  clearData(): Promise<Response> {
    return super.clear();
  }
}