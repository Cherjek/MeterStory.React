import { Fetch } from '../../../../core/service';
import { TimeSettings } from './models/time-settings';

export class TimeActionService extends Fetch {
  constructor() {
    super('/action/time/set');
  }

  saveData(body: any) {
    return super.save(body);
  }
}