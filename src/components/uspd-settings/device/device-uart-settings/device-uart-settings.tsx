import React from 'react';
import FormTemplate from '../../../shared/form-template/form-template';
import { DeviceUartTemplate } from './device-uart-settings-template';
const deviceUartTemplate = new DeviceUartTemplate();
const DeviceUartSettings = () => {
  return (
    <FormTemplate scrollViewTab={1} iformTemplate={deviceUartTemplate}></FormTemplate>
  );
}
export default DeviceUartSettings;