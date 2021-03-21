export const remoteUrl = // 'http://192.168.202.230'
  'http://icbcom.allmonitoring.local';
  // 'http://192.168.205.101';
  // '';

export class Fetch {
  constructor(public url: string) {}

  protected get() {
    return this.baseFetch(null, 'GET');
  }

  protected save(body: any) {
    return this.baseFetch(body, 'PUT');
  }

  protected set(body: any) {
    return this.baseFetch(body, 'POST');
  }

  protected delete(body: any) {
    return this.baseFetch(body, 'DELETE');
  }

  protected clear() {
    return this.baseFetch(null, 'DELETE');
  }

  private checkStatus = (result: any) => {
    if (result.status === 404 || result.status === 403) {
      window.location.href = '/login';
    } else if (result.status >= 400) {
      return 'Не корректный запрос';
    }
    return null;
  }
  private baseFetch = (body: any, type: string) => {
    const method = {
      method: type, // Method itself
      headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
      credentials: 'include'
     }
     if (body != null) {
      (method as any).body = JSON.stringify(body);
     }
     return new Promise<Response>((resolve, reject) => {
      fetch(remoteUrl + this.url, method as any)
        .then(res => {
          const error = this.checkStatus(res);
          if (error) {
            throw new Error(error);
          } else {            
            resolve(res);
          }
        })
        .catch(error => {
          reject(error);
        });
     });
  }
}