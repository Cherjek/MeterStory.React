import React from 'react';
import { DeviceDinTemplate } from './device-din-template';
import FormTemplate from '../../../shared/form-template/form-template';
const deviceDinTemplate = new DeviceDinTemplate();
const DeviceDinSettings = () => {
  return (
    <FormTemplate scrollViewTab={1} iformTemplate={deviceDinTemplate}></FormTemplate>
  );
}
export default DeviceDinSettings;