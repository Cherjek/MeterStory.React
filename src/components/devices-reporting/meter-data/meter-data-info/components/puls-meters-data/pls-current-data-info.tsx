import React from 'react';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import { PulsMetersDataService } from './services/puls-meters-data-service';

const PlsCurrentDataInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'mEng',
        tableHeader: 'Текущие показания импульсов',
        service: PulsMetersDataService,
        groupsPu: [_groupsTypeMeterDictionary[1]]
      }}
    />
  );
};

export default PlsCurrentDataInfo;
