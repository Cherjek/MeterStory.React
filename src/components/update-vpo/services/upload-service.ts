import { Fetch } from '../../../core/service';

export class FileUploadService extends Fetch {
  constructor(url) {
    super(url);
  }
  upload(file: any) {    
    return super.upload(file);
  }
  updateLoader() {
    return super.set(null);
  }
}