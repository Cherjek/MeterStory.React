import { SmtpAddressService } from '../../smtp/smtp-address/services/smtp-address-service';
import { ICallbackColumnService } from '../../../common/data-grid/icallback-service';

export class AddressService implements ICallbackColumnService {
  smtpAddressService: SmtpAddressService;
  static smtpAddress: string[];
  getData(dependVal: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (AddressService.smtpAddress == null) {
        if (this.smtpAddressService == null) this.smtpAddressService = new SmtpAddressService();
        this.smtpAddressService
          .getData()
          .then((result) => {
            AddressService.smtpAddress = ['', ...result?.map(
              (v) =>
                `id: ${v.id}, адрес: ${v.Email}, тел: ${v.Tel}`
            )];
            resolve(AddressService.smtpAddress);
          });
      } else {
        resolve(AddressService.smtpAddress);
      }
    });
  }
}
