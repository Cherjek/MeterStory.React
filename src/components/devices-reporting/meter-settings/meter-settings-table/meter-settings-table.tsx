import React from 'react';
import FormTemplate from '../../../shared/form-template/form-template';
import { MeterSettingsTableTemplate } from './meter-settings-table-template';
const meterSettingsTableTemplate = new MeterSettingsTableTemplate();
const MeterSettingsTable = () => {
  return (
    <FormTemplate scrollViewTab={1} iformTemplate={meterSettingsTableTemplate}></FormTemplate>
  );
}
export default MeterSettingsTable;