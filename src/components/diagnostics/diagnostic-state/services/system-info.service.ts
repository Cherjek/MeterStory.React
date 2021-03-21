import { Fetch } from './../../../../core/service';
import { SystemInfo } from './models/system-info';

export class SystemInfoService extends Fetch {
  constructor() {
    super('/state/system');
  }

  getData = (): Promise<SystemInfo> => {
    return super
      .get()
      .then((res) => res.json())
      .then((res) => {
        const obj = { ...res.SystemInfo, bl: res.bl, fw: res.fw } as SystemInfo;
        return obj;
      });
  }
}
