import { Fetch } from '../../../../core/service';
import { Scheduler } from './models/scheduler';
export class SchedulerService extends Fetch {
  constructor() {
    super('/settings/events/schdl');
  }

  getData(): Promise<Scheduler[]> {
    return super
    .get()
    .then((res) => res.json())
    .then(({ Settings }) => Settings);
  }
}