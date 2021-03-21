import { Fetch } from '../../../../core/service';
import { SchedulerState } from './models/scheduler-state';
export class SchedulerStateService extends Fetch {
  constructor() {
    super('/state/schdl');
  }

  getData(): Promise<SchedulerState[]> {
    return super
    .get()
    .then((res) => res.json())
    .then(({ State }) => State);
  }
}