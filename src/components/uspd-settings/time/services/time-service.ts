import { Fetch } from '../../../../core/service';
import { Time } from './models/time';

export class TimeService extends Fetch {
  constructor(url = '/state/time') {
    super(url);
  }

  getData = (): Promise<Time> => {
    return super.get()
    .then((res) => res.json())
    .then(res => {
      const time = {...new Time(), ...res };
      time.settime = time.time;
      return time;
    });
  }

  saveData(body: Time) {
    return super.save(
      { 
        time: body.settime 
    });
  }

  syncTime() {
    const service = new TimeService('/action/time/sync');
    return service.set(null);
  }

  verifyOn() {
    var settings = {
        state: 'true',
    };
    const service = new TimeService('/action/time/check');
    return service.set(settings);
  };
  
  verifyOff() {
    var settings = {
        state: 'false',
    };
    const service = new TimeService('/action/time/check');
    return service.set(settings);
  };
}