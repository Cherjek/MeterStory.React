import React from 'react';
import { NetworkIpTemplate } from './network-ip-settings-template';
import FormTemplate from '../../../shared/form-template/form-template';
const networkIpTemplate = new NetworkIpTemplate();
const NetworkIpSettings = () => {
  return (
    <FormTemplate scrollViewTab={1} iformTemplate={networkIpTemplate}></FormTemplate>
  );
}
export default NetworkIpSettings;