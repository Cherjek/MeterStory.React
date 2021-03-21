import { Fetch } from '../../../../../core/service';
import { SmptAddress } from './models/smtp-address';

export class SmtpAddressService extends Fetch {
  constructor() {
    super('/settings/address');
  }

  getData = (): Promise<SmptAddress[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings);
  }

  saveData(body: any[]) {
    return super.save({ Settings: body?.map(address => ({ id: address.id, Tel: address.phones, Email: address.emails })) });
  }

  clearData() {
    return super.clear();
  }
}