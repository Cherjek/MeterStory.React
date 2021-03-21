import { Fetch } from '../../../../core/service';
import { level } from '../../../admin/admin-servers/services/auth-settings-service';
export const levelAuth = level;
export class AuthJrnlService extends Fetch {
  constructor() {
    super('/jrnl/auth/json');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Jrnl }) => Jrnl?.map((jrnl: any) => {
        jrnl.lvl = level[(jrnl.lvl as number)];
        return jrnl;
      }));
  }

}