import React from 'react';
import FormTemplate from '../../../shared/form-template/form-template';
import { MeterActionTemplate } from './meter-action-template';
const meterActionTemplate = new MeterActionTemplate();
const MeterActionTable = () => {
  return (
    <FormTemplate scrollViewTab={1} iformTemplate={meterActionTemplate}></FormTemplate>
  );
}
export default MeterActionTable;