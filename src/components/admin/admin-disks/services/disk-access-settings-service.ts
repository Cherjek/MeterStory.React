import { Fetch } from '../../../../core/service';
// import { DiskAccessSettings } from './models/disk-access-settings';

export class DiskAccessSettingsService extends Fetch {
  constructor() {
    super('/settings/file_system/access');
  }

  getData = () => {
    // return new Promise<DiskAccessSettings[]>((resolve, reject) => {
    //   const test = Object.assign(new DiskAccessSettings(), { id: 1, read: true, write: true });
    //   const result = [];
    //   for (let i = 0; i < 30; i++) {
    //     result.push({...test, ...{ id: i + 1 }});  
    //   }
    //   resolve(result);
    // })
    return super.get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings);
  }

  saveData(body: any) {
    return super.save(body);
  }

  deleteData(body: any) {
    return super.delete(body);
  }

  clearData() {
    return super.clear();
  }
}

export class DiskClearService extends Fetch {
  constructor() {
    super('/action/disk/clear');
  }

  diskClear(body: any) {
    return super.set(body);
  }
}