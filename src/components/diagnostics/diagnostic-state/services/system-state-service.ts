import { Fetch } from '../../../../core/service';
import { StateOs, StateOsState } from './models/state-os';
export const states = ['Running','Ready','Blocked','Suspended','Deleted','Invalid'];
export class SystemStateService extends Fetch {
  constructor() {
    super('/state/os');
  }
  stateOs: StateOs;
  getData = (): Promise<StateOsState[]> => {
    return new Promise((resolve, reject) => resolve(this.stateOs?.State));
  }
  getDataInfo() {
    return super
        .get()
        .then((res) => res.json())
        .then(result => {
          this.stateOs = result;
          if (this.stateOs && this.stateOs.State) {
            this.stateOs.State = this.stateOs.State.map(x => {
              x.state = states[(x.state as number)];
              return x;
            });
          }
          return this.stateOs;
        });
  }
}