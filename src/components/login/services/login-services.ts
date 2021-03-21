import { remoteUrl } from '../../../core/service';

export class LoginService {
  login = (form: any) => {
    const method = {
      method: 'POST',
      headers: {
       'Content-type': 'application/json; charset=UTF-8',
       'Accept': '*/*'
      },
      body: JSON.stringify(form),
      credentials: 'include',
      // mode: 'no-cors'
     }
     return fetch(remoteUrl + '/auth', method as any);
  }
}