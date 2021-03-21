import React from 'react';
import FormTemplate from '../../../shared/form-template/form-template';
import { SchdlTemplate } from './schdl-template';
const schdlTemplate = new SchdlTemplate();
const SchdlEventTable = () => {
  return (
    <FormTemplate scrollViewTab={1} iformTemplate={schdlTemplate}></FormTemplate>
  );
}
export default SchdlEventTable;