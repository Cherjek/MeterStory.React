import React from 'react';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';
import { PulsMetersDataService } from './services/puls-meters-data-service';

const PlsHourDataInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aHour',
        showDuration: true,
        tableHeader: 'Показания на начало часа',
        service: PulsMetersDataService,
        groupsPu: [_groupsTypeMeterDictionary[1]]
      }}
    />
  );
};

export default PlsHourDataInfo;
