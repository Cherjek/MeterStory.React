import React from 'react';
import FormTemplate from '../../../shared/form-template/form-template';
import { NetworkCsdTemplate } from './network-csd-settings-template';
const networkCsdTemplate = new NetworkCsdTemplate();
const NetworkCsdSettings = () => {
  return (
    <FormTemplate scrollViewTab={1} iformTemplate={networkCsdTemplate}></FormTemplate>
  );
}
export default NetworkCsdSettings;