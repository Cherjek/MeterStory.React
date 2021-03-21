import React from 'react';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import './month-data-info.scss';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';

const MonthDataInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aMonth',
        showDuration: true,
        tableHeader: 'Показания на начало месяца',
        groupsPu: [_groupsTypeMeterDictionary[0],_groupsTypeMeterDictionary[1]]
      }}
    />
  );
};

export default MonthDataInfo;
