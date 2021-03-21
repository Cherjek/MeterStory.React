import React from 'react';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import './hour-data-info.scss';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';

const HourDataInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aHour',
        showDuration: true,
        tableHeader: 'Показания на начало часа',
        groupsPu: [_groupsTypeMeterDictionary[0]]
      }}
    />
  );
};

export default HourDataInfo;
